/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

export default class WebpackResolvePlugin {
  constructor(options) {
    this.options = options;

    if (!options.path || typeof options.path !== 'string') {
      throw new Error('A file path to the location of shapeshifter schematics is required.');
    }
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin("normal-module-loader", (context, module) => {
        console.log('LOADER', module, context);
      });
    });

    compiler.plugin("normal-module-factory", (nmf) => {
      nmf.plugin("before-resolve", (result, callback) => {
        if (result.request === 'shapeshifter/webpack') {
          result.file = false;
          result.resolved = true;
          result.loaders = [
            function () {
              console.log('LOADER', arguments);
            }
          ]
        }

        console.log('BEFORE', result);

        // We need to resolve it to a file path

        return callback(null, result);
      });

      nmf.plugin("after-resolve", (result, callback) => {
        console.log('AFTER', result);

        if (result.request !== 'shapeshifter/webpack') {
          return callback(null, result);
        }



        return callback(null, result);
      });
    });
  }
}
