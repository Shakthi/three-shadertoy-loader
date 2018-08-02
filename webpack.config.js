var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'none',
	mode: 'development',
	entry: './ShaderToyMaterialLoader.js',
	externals: {
		three: {
			commonjs: 'three',
			commonjs2: 'three',
			amd: 'three',
			root: '_'
		},
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'ShaderToyMaterial.js',
		libraryTarget: 'umd',
		library: 'ShaderToyMaterial',
		globalObject: 'this',
		libraryExport: "default"
	},
	
};