const path = require('path');
const SchematicResolverPlugin = require('./lib/bundlers/WebpackResolvePlugin').default;

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
    new SchematicResolverPlugin({
      schematicsPath: path.join(__dirname, 'tests/schemas'),
      defaultNullable: true,
      includeAttributes: true,
      includeSchemas: true,
      includeTypes: true,
      renderer: 'flow',
    }),
  ],
  // Overwrite our local import so that webpack can resolve it
  externals: {
    shapeshifter: '{}',
  },
};
