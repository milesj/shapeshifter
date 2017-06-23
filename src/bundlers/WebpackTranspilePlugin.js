/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */
/* eslint-disable no-param-reassign, promise/always-return, promise/no-callback-in-promise */

import os from 'os';
import path from 'path';
import Transpiler from '../Transpiler';

export default class WebpackTranspilePlugin {
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
    this.schematicsPath = Array.isArray(schematicsPath) ? schematicsPath : [schematicsPath];
    this.transpiler = new Transpiler(opts);
  }

  apply(compiler) {
    // Create a function that we can use to delete the temporary file
    function cleanupTempFile(arg) {
      if (arg && arg.shapeshifterFile) {
        compiler.outputFileSystem.unlink(arg.shapeshifterFile, (error) => {
          if (error) {
            throw error;
          }
        });
      }

      return arg;
    }

    console.log('COMPILER', compiler);

    // Overwrite the webpack module file with the temporary file
    compiler.plugin('normal-module-factory', (nmf) => {
      nmf.plugin('before-resolve', (result, callback) => {
        if (!result || result.request !== this.importPath) {
          callback(null, result);

          return;
        }

        let tempFile = path.join(os.tmpdir(), 'shapeshifter.js');

        // Temp directory causes issues for webpack-dev-server
        if (compiler.outputFileSystem.constructor.name === 'MemoryFileSystem') {
          tempFile = path.join(result.context, 'shapeshifter.js');

          // We need to create the context folder as it most likely does not exist
          compiler.outputFileSystem.mkdirp(result.context, (error) => {
            if (error) {
              callback(error, result);
            }
          });
        }

        // Tell webpack to read from the temporary file
        result.request = tempFile;
        result.shapeshifterFile = tempFile;

        console.log('RESULT', result);

        // Start transpiling the schematics
        this.transpiler.transpile(this.schematicsPath)
          .then((source) => {
            console.log('SOURCE', source);

            // Write the output to the temporary file
            compiler.outputFileSystem.writeFile(tempFile, source, 'utf8', (writeError) => {
              console.log('WRITE', writeError);
              callback(writeError, result);
            });
          })
          .catch((error) => {
            console.log('TRANSPILE ERROR', error);
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
