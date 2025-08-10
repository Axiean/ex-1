# --- Stage 1: Build Environment ---
# Use a lightweight Alpine-based Node.js image for the build stage to keep the initial
# layer small and efficient. The 'builder' alias is used to reference this stage later.
FROM node:22-alpine AS builder

# Set the working directory within the container. All subsequent commands will run from this path.
WORKDIR /app

# Install pnpm, the package manager used for this monorepo.
RUN npm install -g pnpm

# Copy the package manager configuration files first. This leverages Docker's layer caching.
# These files change less frequently than the source code, so their layer will be cached
# unless they are modified, speeding up subsequent builds.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the package.json for each individual workspace to ensure pnpm can resolve the full dependency tree.
COPY home/package.json ./home/
COPY products/package.json ./products/
COPY basket/package.json ./basket/
COPY library/package.json ./library/

# Install all dependencies across all workspaces based on the lockfile.
RUN pnpm install

# Copy the entire source code into the container. This is done after installing dependencies
# to ensure that code changes don't invalidate the dependency cache layer.
COPY . .

# Run the build script for all applications in the monorepo.
RUN pnpm run build

# --- Stage 2: Production Environment ---
# Start from a fresh, lightweight Node.js Alpine image for the final production container.
# This ensures the final image is as small as possible, containing no build-time dependencies or source code.
FROM node:22-alpine

WORKDIR /app

# Install pnpm, which is required to execute the start script.
RUN npm install -g pnpm

# Copy only the necessary build artifacts and package manager configurations from the 'builder' stage.
# This is the core of the multi-stage build pattern, resulting in a lean final image.
COPY --from=builder /app/home /app/home
COPY --from=builder /app/products /app/products
COPY --from=builder /app/basket /app/basket
COPY --from=builder /app/library /app/library
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/pnpm-lock.yaml /app/
COPY --from=builder /app/pnpm-workspace.yaml /app/

# Install only the production dependencies. The `--prod` flag skips all devDependencies,
# further reducing the size and attack surface of the final image.
RUN pnpm install --prod

# Expose the ports that the micro-frontend applications will listen on.
# This metadata is used by Docker to map ports to the host machine.
EXPOSE 3000 3001 3002

# The command to run when the container starts. This executes the 'serve' script
# defined in the root package.json, which starts all production servers concurrently.
CMD ["pnpm", "run", "serve"]