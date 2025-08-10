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
  transpilePackages: ["library"],

  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        dts: false,
        exposes: {
          "./home": "./src/pages/index.tsx",
          "./pages-map": "./pages-map.js",
          "./library/components": "./../library/src/components/index.ts",
          "./library/types": "./../library/src/types/index.ts",
          "./library/hooks": "./../library/src/hooks/index.ts",
        },
        remotes: remotes(options.isServer),
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          antd: {
            singleton: true,
            requiredVersion: deps.antd,
          },
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};
