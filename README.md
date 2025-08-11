# Kayra Export E-Commerce Micro-Frontend Application

This project is a modern, scalable e-commerce platform built on a micro-frontend architecture using Next.js and React. It demonstrates the principles of SOLID, the 12-Factor App methodology, and advanced frontend concepts like module federation, centralized state management, and CI/CD.

The application is composed of several independent applications (remotes) that are dynamically loaded and orchestrated by a central host application. This approach allows for independent development, deployment, and scaling of different features like the product catalog and the shopping basket.

---

## Core Technologies

- **Frameworks**: React & Next.js
- **Component Library**: Ant Design
- **Language**: TypeScript/Javascript
- **State Management**: Redux Toolkit with RTK Query
- **API Integration**: Fake Store API
- **Micro-Frontend Architecture**: Webpack 5 Module Federation
- **Package Manager**: pnpm Workspaces

---

## Architecture Overview

The project follows a micro-frontend model to break down the monolithic frontend into smaller, more manageable pieces.

- **`home` (Host Application)**: A Next.js application that serves as the main shell. It is responsible for rendering the global layout (like the navigation bar), managing the global state, and dynamically loading and displaying remote applications.
- **`products` (Remote Application)**: A Next.js application that manages the product catalog. It exposes both a full page for the `/products` route and a reusable `ProductList` component.
- **`basket` (Remote Application)**: A standard React (CRA-like) application responsible for rendering the shopping cart UI. It is designed to be a purely presentational component that receives its state from the host.
- **`library` (Shared Workspace)**: A shared library within the monorepo that contains reusable components (e.g., `ProductCard`, `Nav`), TypeScript types, and custom hooks (`useMediaQuery`). This ensures consistency and avoids code duplication across the different applications.

---

## Micro-Frontend Integration Approaches

A key aspect of this project is the demonstration of two different strategies for integrating remote applications, showcasing the flexibility of Module Federation.

### 1. Dynamic Component Import (`/basket` page)

The `/basket` page uses a **Dynamic Import** approach.

- The **`home` (host)** application owns the `/basket` route.
- It is responsible for all business logic: fetching the basket state from the Redux store and defining the functions to update it (e.g., `handleRemoveItem`, `handleUpdateQuantity`).
- It then dynamically imports the `Basket` UI component from the `basket` remote using `next/dynamic`.
- The host passes the state and handler functions down to the remote component as props.

This approach is ideal for features where the UI is self-contained, but the state and logic are tightly coupled with the main application shell.

### 2. Page Stitching / Re-export (`/products` page)

The `/products` page uses a **Direct Re-export** or "Page Stitching" approach.

- The **`products` (remote)** application owns the entire page, including its data fetching, layout, and logic.
- The `home` (host) application has a file at `/pages/products.tsx` that does nothing but import and immediately re-export the page component from the `products` remote.

This pattern is powerful for features that are fully autonomous, allowing a team to have complete ownership over a specific route within the larger application.

---

## Key Features

- **Centralized State Management**: The application uses **Redux Toolkit** for a predictable and scalable state container. All application state, such as the contents of the shopping basket, is managed within the `home` host application.
- **Persistent Shopping Basket**: To enhance user experience, **Redux Persist** is integrated. This automatically saves the user's basket. As a result, if the user refreshes the page or closes and reopens the browser, their basket items remain, preventing loss of their selected products.
- **Efficient API Handling**: **RTK Query** is used to handle all API interactions with the Fake Store API. It provides a robust solution for data fetching, caching, and state synchronization, eliminating the need for manual loading and error state management.
- **SOLID Principles & HOCs**: The codebase is structured following SOLID principles. For example, Higher-Order Components (HOCs) like `withErrorBoundary` are used to encapsulate cross-cutting concerns, making components like the product list more resilient to runtime errors without cluttering their core logic.

---

## Architectural Principles & Methodology

This project is built in strong alignment with modern architectural best practices to ensure it is scalable, maintainable, and portable.

### 12-Factor App Compliance

The application adheres to the principles of the **[12-Factor App](https://12factor.net/)** methodology. This includes a strict separation of build and run stages (via a multi-stage `Dockerfile`), stateless processes, and explicitly declared dependencies.

A notable, deliberate exception is **Factor III: Config**. For the scope of this case study, configuration values such as port numbers and API endpoints are managed directly within their respective configuration files. This decision was made for simplicity, as the project does not contain any sensitive credentials or secrets that would necessitate the use of environment variables (`.env` files). In a production-grade application, all configuration would be strictly externalized into the environment.

---

## Styling Approach

As requested, this project does not use any dedicated styling libraries like Sass, Tailwind CSS, or Styled Components. The user interface is built exclusively using:

- **Ant Design**: A comprehensive React UI library for high-quality, pre-built components.
- **Inline Styles**: For component-specific or dynamic styling needs, React's inline style objects are used.

---

## Getting Started

### Prerequisites

- Node.js (v22.x or later)
- pnpm (v8.x or later)

### Local Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Axiean/ex-1
    cd ex-1
    ```

2.  **Install dependencies:**
    Use `pnpm` to install all dependencies for all workspaces in the monorepo.

    ```bash
    pnpm install
    ```

3.  **Run the development servers:**
    This command will concurrently start the development servers for the `home`, `products`, and `basket` applications.

    ```bash
    pnpm dev
    ```

    You should access the application through the host URL: **[http://localhost:3001](http://localhost:3001)**.

---

## Docker Deployment

The project is fully containerized for consistent and reproducible deployments.

1.  **Build the Docker image:**
    From the project root, run the following command. This will execute the multi-stage build defined in the `Dockerfile`.

    ```bash
    docker build -t micro-frontend-ecommerce .
    ```

2.  **Run the container using Docker Compose:**
    The `docker-compose.yml` file is configured to run the production-ready image.
    ```bash
    docker-compose up
    ```
    This will start the container and map the application ports to your local machine, making the application accessible at [http://localhost:3001](http://localhost:3001).

---

## Continuous Integration (CI)

A CI pipeline is configured using **GitHub Actions** (`.github/workflows/ci.yml`). This workflow is triggered on every push to the `test/v1.0.0` branch and pull request to `prod/v1.0.0`.

The pipeline automatically performs the following steps:

1.  Checks out the repository.
2.  Sets up the correct Node.js and pnpm versions.
3.  Installs all dependencies using `pnpm install`.
4.  Runs the `pnpm run build` command to ensure all applications in the monorepo build successfully.

This ensures code integrity and that the project is always in a deployable state.
