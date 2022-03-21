/** @format */
const path = require("path");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: "production",
	entry: {
		app: path.join(__dirname, "../src") + "/index.prod.tsx",
		
	},
	output: {
		publicPath: "./",
	},
});

module.exports = Promise.resolve(buildWebpackConfig);
