# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy app-specific package files
COPY home/package.json ./home/
COPY products/package.json ./products/
COPY basket/package.json ./basket/
COPY library/package.json ./library/

# Install dependencies
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Build all applications
RUN pnpm run build

# Stage 2: Production environment
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy built applications and package files from the builder stage
COPY --from=builder /app/home /app/home
COPY --from=builder /app/products /app/products
COPY --from=builder /app/basket /app/basket
COPY --from=builder /app/library /app/library
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/pnpm-lock.yaml /app/
COPY --from=builder /app/pnpm-workspace.yaml /app/

# Install only production dependencies
RUN pnpm install --prod

# Expose the ports for each application
EXPOSE 3000 3001 3002

# Start all services
CMD ["pnpm", "run", "serve"]