const NextFederationPlugin = require("@module-federation/nextjs-mf");

/**
 * @file Next.js configuration for the 'products' remote application.
 *
 * @description This config sets up the 'products' app as a federated module. It defines
 * which components and pages are exposed to the host and which remotes it can consume.
 * This modular setup allows the product-related features to be developed and deployed
 * independently.
 */
const remotes = (isServer) => {
  // Dynamically sets the remote URLs based on the execution environment (server or client).
  const location = isServer ? "ssr" : "chunks";
  return {
    home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    basket: `basket@http://localhost:3000/remoteEntry.js`,
  };
};

module.exports = {
  // Ensures that the shared 'library' package is transpiled for compatibility.
  transpilePackages: ["library"],

  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "products",
        filename: "static/chunks/remoteEntry.js",
        dts: false,
        exposes: {
          // Exposes the main products page for page stitching.
          "./products": "./src/pages/products.tsx",
          // Exposes the reusable ProductList component for import by other remotes.
          "./ProductList": "./src/components/ProductsList.tsx",
          "./pages-map": "./pages-map.js",
        },
        remotes: remotes(options.isServer),
        /**
         * The 'shared' configuration is empty, relying on the host application to provide
         * singleton instances of shared libraries like React. This is a viable strategy in a
         * controlled monorepo but can be risky if versions diverge. Explicitly defining
         * shared dependencies is often a safer approach.
         */
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};
