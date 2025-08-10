const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

/**
 * @file Webpack configuration for the 'basket' remote application.
 *
 * @description This configuration is responsible for bundling the React-based basket application,
 * exposing it as a federated module for consumption by a host application, and setting up the
 * development server. It is optimized for a micro-frontend architecture where dependencies like React
 * are shared to avoid duplication and ensure consistency across the application ecosystem.
 */
module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    hot: true, // Enables Hot Module Replacement for a better development experience.
    headers: {
      // Required for CORS, allowing the host application (running on a different port)
      // to fetch the remote entry and its chunks.
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    /**
     * 'auto' is crucial for Module Federation. It automatically determines the public path
     * from which to load chunks, allowing the same bundle to be deployed to different
     * environments (e.g., localhost, staging, production) without reconfiguration.
     */
    publicPath: "auto",
  },
  resolve: {
    // Defines the extensions that Webpack will resolve, allowing for extension-less imports.
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".css"],
    // Establishes an alias for the shared 'library' workspace, simplifying imports
    // and ensuring a consistent path resolution across the monorepo.
    alias: {
      "@library": path.resolve(__dirname, "../library/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "basket",
      filename: "remoteEntry.js",
      exposes: {
        // Exposes the main `App` component under the alias './Basket'.
        // This allows the host application to dynamically import `basket/Basket`.
        "./Basket": "./src/App",
      },
      /**
       * Defines shared dependencies. This is the core of Module Federation's optimization.
       * By declaring shared modules, we prevent them from being bundled into this remote's chunks
       * if the host application already provides them.
       */
      shared: {
        ...deps,
        // React and react-dom are configured as singletons to prevent multiple, conflicting
        // instances of React from running on the same page, which would break hooks and context.
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    // Generates an `index.html` file to serve the application, which is useful
    // for standalone development and testing of this remote.
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
