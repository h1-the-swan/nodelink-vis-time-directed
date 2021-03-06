/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');
// const changeCase = require('change-case')
// const nodeExternals = require('webpack-node-externals');

let libraryName = 'CitationVis';

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = pkg.name + '.min.js';
} else {
  mode = 'development';
  outputFile = pkg.name + '.js';
}

const config = {
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
	libraryExport: 'default',
    umdNamedDefine: true,
	// libraryTarget: 'var',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
	  {
		  test: /\.css$/, use: "ignore-loader"
	  }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  // target: 'node', // in order to ignore built-in modules like path, fs, etc.
  target: 'web',
  externals: [
	  {
		  'tippy.js': {
			  commonjs: 'tippy.js',
			  commonjs2: 'tippy.js',
			  amd: 'tippy.js',
			  root: 'tippy'
		  }
	  },
	  // {tippy: 'tippy.js'},
	  // 'tippy.js',
	  'd3',
	  {jquery: 'jQuery'},
	  {popper: 'popper.js'}
  ]
};

function externalItem(name, rootName) {
	return {
			"commonjs": name,
			"commonjs2": name,
			"amd": name,
			"root": rootName
		};
}

module.exports = config;
