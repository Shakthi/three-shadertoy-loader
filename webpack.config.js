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
		'three-shadertoy-material':{
			commonjs: 'three-shadertoy-material',
			commonjs2: 'three-shadertoy-material',
			amd: 'three-shadertoy-material',
			root: '_'
		}
		
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		libraryTarget: 'umd',
		library: 'ShaderToyMaterialLoader',
		globalObject: 'this',
		libraryExport: "default"
	},
	
};