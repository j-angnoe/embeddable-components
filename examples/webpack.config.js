// const webpack = require("webpack");
var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        'some-react-component': './some-react-component-entrypoint',
		'some-vue-component': './some-vue-component-entrypoint',
		'vanilla-super-clock' : './vanilla-super-clock',
		'some-svelte-component': './some-svelte-component-entrypoint.js'
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
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
		  },
		  {
			test: /\.(html|svelte)$/,
			exclude: /node_modules/,
			use: 'svelte-loader'
		  }
        ]
    },
    resolve: {
		alias: {
			'embeddable-components': path.resolve(__dirname, '..')
		},
		extensions: ["*", ".js", ".jsx", "*.vue"]
	},
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "[name].js"
    },
    plugins: [
    new VueLoaderPlugin()
    ]
}
