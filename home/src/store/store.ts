import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import basketReducer from "./basketSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

/**
 * @file Redux store configuration.
 * @description This file configures and exports the main Redux store for the application.
 * It combines multiple reducers, sets up RTK Query for data fetching, and integrates
 * `redux-persist` to save a portion of the state to local storage, ensuring data
 * persistence across user sessions.
 */

// Configuration for redux-persist.
const persistConfig = {
  key: "root", // The key for the persisted state in storage.
  storage, // Specifies the storage engine, defaulting to localStorage for web.
  /**
   * The `whitelist` determines which slices of the Redux state will be persisted.
   * Here, we only persist the 'basket' to ensure the user's shopping cart is saved,
   * while transient state like API data is fetched fresh on each session. This is a
   * critical optimization to avoid storing stale or unnecessary data.
   */
  whitelist: ["basket"],
};

// Combine all reducers into a single root reducer.
const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  basket: basketReducer,
});

// Wrap the root reducer with the persistReducer to enable state persistence.
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /**
       * It's crucial to configure the serializableCheck middleware to ignore actions
       * dispatched by redux-persist. These actions often contain non-serializable values
       * (like functions) which would otherwise cause warnings or errors in development.
       */
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // The RTK Query middleware is concatenated to handle automatic data fetching,
      // caching, and invalidation.
    }).concat(productsApi.middleware),
});

// The persistor is responsible for managing the hydration of the store.
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself.
// This is a best practice that ensures type safety throughout the application
// without manual type declarations.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
