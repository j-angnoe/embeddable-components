// const webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        'embeddable-components': './EmbeddableComponents'
    },
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: { presets: ["@babel/env"] }
          },
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "[name].js"
    },
}
