/**
 * @file Type declarations for federated modules consumed by the 'products' application.
 *
 * @description This file provides ambient module declarations that allow the 'products'
 * application to safely import modules from other remotes in the federation.
 * By declaring the expected module paths, we enable TypeScript to resolve these
 * dynamic imports at compile time, providing type safety and developer tooling support.
 */

// Declares the shape of the 'home' module exposed by the 'home' host.
declare module "home/home";

// Declares the shape of the 'basket' module. Although 'products' may not directly
// use the basket UI, this declaration is included for completeness, allowing for
// future inter-app communication or component usage.
declare module "basket/basket";
