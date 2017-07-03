const path = require('path');
const ShapeshifterPlugin = require('./lib/bundlers/WebpackPlugin').default;

module.exports = {
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
        use: {
          loader: 'babel-loader',
          options: {
            extends: path.join(__dirname, 'node_modules/@milesj/build-tool-config/babel.node.json5'),
          },
        },
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
      includeSchemas: true,
      includeTypes: true,
      format: 'flow',
    }),
  ],
  // The shapeshifter import won't work from within shapeshifter itself,
  // so overwrite the exported value for testing purposes.
  externals: {
    shapeshifter: '{}',
  },
};
