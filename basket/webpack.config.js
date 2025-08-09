const path = require("path"); // Make sure path is imported at the top

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".css"],

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
        "./Basket": "./src/App",
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
