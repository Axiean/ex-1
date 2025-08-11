const NextFederationPlugin = require("@module-federation/nextjs-mf");

/**
 * @file Next.js configuration for the 'home' host application.
 *
 * @description This configuration sets up the Next.js development and build environment,
 * with a primary focus on integrating Webpack Module Federation. It defines the application as a
 * host ('home') that consumes remote modules ('products', 'basket') and also exposes some of
 * its own modules, enabling a bi-directional hosting architecture.
 */

// Dynamically configure remote URLs based on the server/client environment.
// For server-side rendering (SSR), we consume from the 'ssr' location, while the client
// consumes from the 'chunks' location. This ensures the correct module resolution path is used.
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    products: `products@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    basket: `basket@http://localhost:3000/remoteEntry.js`,
  };
};

module.exports = {
  // Instructs Next.js to transpile our shared 'library' package. This is essential
  // in a monorepo setup to ensure the code from the library is compatible with the host.
  transpilePackages: ["library"],

  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        dts: false, // Disabling TypeScript definition generation for this module.
        exposes: {
          // Exposes the main home page, allowing other remotes to potentially render it.
          "./home": "./src/pages/index.tsx",
          // Exposes a map of pages for dynamic routing capabilities.
          "./pages-map": "./pages-map.js",
          // Exposes the entire shared library from the host, ensuring that any remote
          // consuming the host can leverage these shared components and types.
          "./library/components": "./../library/src/components/index.ts",
          "./library/types": "./../library/src/types/index.ts",
          "./library/hooks": "./../library/src/hooks/index.ts",
        },
        remotes: remotes(options.isServer),
        /**
         * The 'shared' configuration is left empty here. While this is a valid approach if
         * dependency version management is handled carefully at the monorepo level, in larger
         * or more complex systems, explicitly defining shared singletons (like React) is crucial
         * to prevent version conflicts and ensure optimal performance. The current setup relies
         * on implicit sharing.
         */
        shared: {},
        extraOptions: {
          // This option enables the experimental feature to expose Next.js pages,
          // which is key for seamless integration of remote pages within the host.
          exposePages: true,
        },
      })
    );

    return config;
  },
};
