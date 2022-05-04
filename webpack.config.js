const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');

/**
 * CONFIGURE WEBPACK BUNDLE
 * 
 * The code below is intended to override the default bundle structure of the react generator library used.
 * Running this code will bundle the entire project into a single JS file, rather than multiple files.
 */
module.exports = {
	mode: 'production',
	entry: {
		'bundle.js': glob.sync('build/static/?(js|css)/main.*.?(js|css)').map(f => path.resolve(__dirname, f))
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'static/js/bundle.min.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [new UglifyJsPlugin()]
};
