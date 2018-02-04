/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import path from 'path';

export default class WebpackPlugin {
  constructor(options = {}) {
    const { schematicsImportPath = 'shapeshifter/schematics', schematicsSource, ...opts } = options;

    if (!schematicsImportPath) {
      throw new Error('An import name is required to resolve with.');
    }

    if (!schematicsSource) {
      throw new Error('A file path to the location of shapeshifter schematics is required.');
    }

    if (opts.format) {
      opts.renderer = opts.format;
      delete opts.format;
    }

    this.schematicsImportPath = schematicsImportPath;
    this.schematicsSource = Array.isArray(schematicsSource) ? schematicsSource : [schematicsSource];
    this.options = opts;
  }

  apply(compiler) {
    compiler.plugin('normal-module-factory', nmf => {
      nmf.plugin('after-resolve', (result, callback) => {
        if (result.rawRequest === this.schematicsImportPath) {
          result.loaders.push({
            loader: path.join(__dirname, './webpackLoader.js'),
            options: {
              ...this.options,
              schematicsSource: this.schematicsSource,
            },
          });
        }

        callback(null, result);
      });
    });
  }
}
