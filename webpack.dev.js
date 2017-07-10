const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const jsPath = 'src/main/webapp/resources/js/';
const jsRoot = path.join(__dirname, jsPath);
const targetDir = path.join(__dirname, 'target/CheckoutWebApplication-1.0/resources/js/bundle/');

const configuration = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'vendor-lib': ['react', 'react-dom'],
    'default-dist-webtag': path.join(jsRoot + 'tracking/fraud', 'default-dist-webtag.js'),
    adrum: path.join(jsRoot, 'modules/adrum.js'),
    main: path.join(jsRoot, 'entry.js')
  },
  output: {
    path: targetDir,
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: 'resources/js/bundle/',
    sourceMapFilename: '[name].[chunkhash].map'

  },
  resolve: {
    alias: {
      modules: jsRoot + '/modules',
      tracking: jsRoot + '/tracking',
      libs: jsRoot + '/libs',
      lang: jsRoot + '/lang',
      fancybox: jsRoot + "/plugins/jquery.fancybox",
      validate: jsRoot + "/plugins/jquery.validate",
      spin: jsRoot + "/plugins/spin",
      json: jsRoot + "/plugins/json",
      pca: jsRoot + "/plugins/pca-intl",
      pcajr7: jsRoot + "/plugins/pca-jr17-1.0.5",
      pcaah71: jsRoot + "/plugins/pca-ah71-1.0.5",
      thgTracking: jsRoot + "/tracking/thg/thg-tracking",
      masterPassClient: jsRoot + "/plugins/masterpass.client",
      popover: jsRoot + "/plugins/popover",
      tooltipPlugin: jsRoot + "/plugins/jquery.bootstrap.tooltip",
      popoverPlugin: jsRoot + "/plugins/jquery.bootstrap.popover",
      thirdParties: jsRoot + "/thirdparties/main-1",
      sessionCam: jsRoot + "/thirdparties/sessioncam/sessioncam-tag-1",
      livePerson: jsRoot + "/thirdparties/liveperson/mtagconfig-1",
      utils: jsRoot + "/modules/utils",
      poller: jsRoot + "/modules/poller-main"
    }
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: {
          loader: 'json-loader'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2015", 'react'],
            plugins: ["transform-remove-strict-mode"]
          }
        }
      }
    ]
  },
  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
                                              name: ["vendor-lib", "manifest"], // vendor libs +
                                                                                // extracted
                                                                                // manifest
                                              minChunks: Infinity,
                                            }),
    new webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin(),
  ]
};

module.exports = configuration;
