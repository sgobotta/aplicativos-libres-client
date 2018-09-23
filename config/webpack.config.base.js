/*eslint-disable no-console */
const crypto = require('crypto');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const autoprefixer = require('autoprefixer');
const dateFns = require('date-fns');
const paths = require('./paths');
const path = require('path');

const NPMPackage = require(paths.packageJson);

const { NODE_ENV } = process.env;
const isProd = process.env.NODE_ENV === 'production';

const current_date = (new Date()).valueOf().toString();
const random = Math.random().toString();
const generatedHash = crypto.createHash('sha1').update(current_date + random).digest('hex');

const cssLoaders = [
  { loader: 'style' },
  {
    loader: 'css',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'postcss',
    options: {
      sourceMap: true,
      plugins: [
        autoprefixer(),
      ],
    },
  },
  {
    loader: 'sass',
    options: {
      sourceMap: true,
      outputStyle: 'compact',
    },
  },
];

module.exports = {
  resolve: {
    alias: {
      'app-store$': paths.store,
      assets: paths.assets,
      modernizr$: paths.modernizrrc,
      test: paths.test,
      leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
    },
    modules: [paths.appScripts, paths.nodeModules],
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  context: paths.app,
  devtool: '#cheap-module-source-map',
  entry: {},
  output: {
    filename: '[name].[git-version].js',
    path: paths.destination,
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // gitInfoPlugin,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV || 'development'),
      APP__BUILD_DATE: JSON.stringify(dateFns.format(new Date(), 'DD/MM/YYYY')),
      APP__GITHASH: JSON.stringify(generatedHash),
      APP__VERSION: JSON.stringify(NPMPackage.version),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: isProd ? ExtractText.extract({
          use: cssLoaders.slice(1),
        }) : cssLoaders,
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file?name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /(marker-icon.png|marker-shadow.png|marker-icon-2x.png|layers-2x.png|layers.png)$/,
        loader: 'file-loader',
        include: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        exclude: /node_modules/,
        use: [
          `file?hash=sha512&digest=hex${isProd ? '&name=media/[name].[ext]' : ''}`,
          {
            loader: 'image-webpack',
            query: {
              optipng: {
                optimizationLevel: 5,
              },
              pngquant: {
                quality: '75-90',
              },
            },
          },
        ],
        include: /media/,
      },
      {
        test: /(manifest\.json|\.xml)$/,
        use: [
          {
            loader: 'file',
            query: { name: '[name].[ext]' },
          },
        ],
        include: /assets/,
      },
      {
        test: /modernizrrc\.json$/,
        use: ['expose?Modernizr', 'modernizr', 'json'],
      },
      {
        test: /\.md$/,
        use: ['html', 'markdown'],
      },
      {
        test: /\leaflet.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },
    ],
  },
};
