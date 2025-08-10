import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * @file Typed Redux hooks.
 * @description This file exports pre-typed versions of the core `useDispatch` and
 * `useSelector` hooks from React-Redux. Using these typed hooks throughout the
 * application is a critical best practice for ensuring type safety. It allows
 * TypeScript to infer the types of the state and dispatch function automatically,
 * providing better autocompletion and preventing common bugs.
 */

// A typed version of `useDispatch` that is aware of the store's `AppDispatch` type.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// A typed version of `useSelector` that is aware of the store's `RootState` type.
export const useAppSelector = useSelector.withTypes<RootState>();
