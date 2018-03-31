/* eslint-disable sort-keys */

const path = require('path');
const ShapeshifterPlugin = require('./lib/bundlers/WebpackPlugin').default;

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'tests/bundle.js'),
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, 'tests'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new ShapeshifterPlugin({
      // Overwrite "shapeshifter/schematics" for local testing
      schematicsImportPath: './bundle-schematics',
      schematicsSource: path.join(__dirname, 'tests/schemas'),
      defaultNullable: true,
      includeAttributes: true,
      includeDefinitions: true,
      includeSchemas: true,
      renderers: ['prop-types'],
    }),
  ],
  // The shapeshifter import won't work from within shapeshifter itself,
  // so overwrite the exported value for testing purposes.
  externals: {
    shapeshifter: '{}',
  },
};
