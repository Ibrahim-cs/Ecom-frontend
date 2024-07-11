const path = require("path");
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    host: "localhost", // where to run
    historyApiFallback: true,
    port: 9000, //given port to exec. app
    open: true, // open new tab
    hot: true, // Enable webpack's Hot Module Replacement
  },
};
