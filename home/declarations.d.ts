/**
 * @file Type declarations for federated modules consumed by the 'home' application.
 *
 * @description This file provides ambient module declarations for TypeScript. It allows
 * the 'home' application to import components and modules from its remotes ('basket', 'products')
 * with type safety, even though they are loaded dynamically at runtime.
 *
 * Each declaration maps a module path (e.g., 'basket/Basket') to a type definition,
 * enabling TypeScript to understand the shape of the imported module and provide
 * autocompletion and type-checking. This is a crucial part of maintaining a robust
 * and maintainable typed micro-frontend architecture.
 */

// Declares the shape of the 'Basket' component exposed by the 'basket' remote.
declare module "basket/Basket";

// Declares the modules exposed by the 'products' remote.
declare module "products/products";
declare module "products/pdp";
declare module "products/ProductList";
