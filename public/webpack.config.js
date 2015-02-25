var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: "./js/app.jsx",
  output: {
    path: __dirname + "/js",
    filename: "bundle.js"
  },
  externals: {
      'react': 'window.React',
      'fluxxor': 'window.Fluxxor',
      'react-router': 'window.ReactRouter'
  },
  devtool: "source-map",
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" },
    ]
  }
};
