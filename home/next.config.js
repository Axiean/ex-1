const NextFederationPlugin = require("@module-federation/nextjs-mf");
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    products: `products@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    basket: `basket@http://localhost:3000/remoteEntry.js`,
  };
};
module.exports = {
  transpilePackages: ["ui-library"],

  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        dts: false,
        exposes: {
          "./nav": "./src/components/nav.tsx",
          "./home": "./src/pages/index.tsx",
          "./pages-map": "./pages-map.js",
          "./ui-library": "./../ui-library/src/index.ts",
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
