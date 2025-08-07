const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 3000, // The basket app should run on port 3000
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"], // Add .ts and .tsx
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, // Updated to include .ts and .tsx
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"], // Add typescript preset
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "basket", // Changed from "remote" to "basket"
      filename: "remoteEntry.js",
      exposes: {
        "./Basket": "./src/App", // Expose the main App component as Basket
      },
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
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
