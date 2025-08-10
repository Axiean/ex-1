import type { Product } from "@library/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * @summary RTK Query API slice for fetching product data.
 * @description This file defines an API slice using Redux Toolkit Query (RTK Query).
 * It automates the entire data fetching and caching process for the products endpoint,
 * handling loading states, errors, and re-fetching logic out of the box.
 * This approach centralizes API definitions and eliminates the need for manual
 * async thunks and state management for API data.
 */
export const productsApi = createApi({
  // A unique key that identifies this API slice in the Redux store.
  reducerPath: "productsApi",
  // `fetchBaseQuery` is a lightweight wrapper around `fetch` that simplifies requests.
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  /**
   * Endpoints are defined here. Each endpoint represents a specific operation
   * against the base URL (e.g., fetching a list of products, a single product, etc.).
   */
  endpoints: (builder) => ({
    // Defines a 'query' endpoint for fetching products.
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
    }),
  }),
});

// RTK Query automatically generates React hooks for each defined endpoint.
// These hooks encapsulate the entire data fetching lifecycle, providing `data`,
// `isLoading`, `isError`, and other states directly to components.
export const { useGetProductsQuery } = productsApi;
