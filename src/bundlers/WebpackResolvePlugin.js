/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */
/* eslint-disable no-param-reassign, promise/always-return, promise/no-callback-in-promise */

import os from 'os';
import path from 'path';
import Transpiler from '../Transpiler';

export default class WebpackResolvePlugin {
  constructor(options = {}) {
    const {
      importPath = 'shapeshifter/schematics',
      schematicsPath,
      ...opts
    } = options;

    if (!importPath) {
      throw new Error('An import path is required to resolve with.');
    }

    if (!schematicsPath) {
      throw new Error('A file path to the location of shapeshifter schematics is required.');
    }

    if (opts.format) {
      opts.renderer = opts.format;
    }

    this.importPath = importPath;
    this.schematicsPath = schematicsPath;
    this.transpiler = new Transpiler(opts);
  }

  apply(compiler) {
    const tempFile = path.join(os.tmpdir(), 'shapeshifter.js');

    // Create a function that we can use to delete the temporary file
    function cleanupTempFile(arg) {
      if (arg && (arg instanceof Error || arg.rawRequest === tempFile)) {
        compiler.outputFileSystem.unlink(tempFile);
      }

      return arg;
    }

    // Overwrite the webpack module file with the temporary file
    compiler.plugin('normal-module-factory', (nmf) => {
      nmf.plugin('before-resolve', (result, callback) => {
        if (!result || result.request !== this.importPath) {
          callback(null, result);

          return;
        }

        // Tell webpack to read from the temporary file
        result.request = tempFile;

        // Start transpiling the schematics and write the output to the temporary file
        this.transpiler.transpile(this.schematicsPath)
          .then((source) => {
            compiler.outputFileSystem.writeFile(tempFile, source, (error) => {
              callback(error, result);
            });
          })
          .catch((error) => {
            callback(error, result);
          });
      });
    });

    // Cleanup and delete the temporary file
    compiler.plugin('failed', cleanupTempFile);
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('failed-module', cleanupTempFile);
      compilation.plugin('succeed-module', cleanupTempFile);
    });
  }
}
