/*jshint esversion: 6 */

var path = require('path');
module.exports = {
  //define entry point: which file we should be looking at
  entry: "./app/assets/scripts/App.js",
  output: {
    path:path.resolve(__dirname, "./app/temp/scripts"),
    filename: "App.js"
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}
