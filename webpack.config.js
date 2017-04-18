var path = require('path');
var ShapeshifterResolverPlugin = require('./lib/bundlers/WebpackResolvePlugin').default;

module.exports = {
  entry: path.join(__dirname, 'tests/bundle-entry.js'),
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  plugins: [
    new ShapeshifterResolverPlugin({
      path: path.join(__dirname, 'tests/schemas'),
      nullable: true,
      attributes: true,
      schemas: true,
      types: true,
      format: 'flow',
    }),
  ],
};
