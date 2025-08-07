const NextFederationPlugin = require("@module-federation/nextjs-mf");

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    basket: `basket@http://localhost:3000/remoteEntry.js`,
  };
};
module.exports = {
  transpilePackages: ["ui-library"],

  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "products",
        filename: "static/chunks/remoteEntry.js",
        dts: false,
        exposes: {
          "./products": "./src/pages/products.tsx",
          "./pdp": "./src/pages/p/[...slug].tsx",
          "./ProductList": "./src/components/ProductsList.tsx",
          "./pages-map": "./pages-map.js",
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};
