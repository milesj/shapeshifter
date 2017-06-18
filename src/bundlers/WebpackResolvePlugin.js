/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */
/* eslint-disable no-param-reassign, no-underscore-dangle */

import fs from 'fs';
import os from 'os';
import path from 'path';
import Transpiler from '../Transpiler';

const TEMP_RESOLVER_FILE = path.join(os.tmpdir(), 'shapeshifter.js');

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
    // Start transpiling the schematics and write the output to a temporary file
    this.transpiler.transpile(this.schematicsPath)
      .then(source => fs.writeFileSync(TEMP_RESOLVER_FILE, source))
      .catch((error) => {
        throw error;
      });

    // Overwrite the webpack module file with the temporary file
    compiler.plugin('normal-module-factory', (nmf) => {
      nmf.plugin('before-resolve', (result, callback) => {
        if (result.request === this.importPath) {
          result.request = TEMP_RESOLVER_FILE;
        }

        return callback(null, result);
      });
    });

    // Delete the temporary file
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('succeed-module', (result) => {
        if (result.request === TEMP_RESOLVER_FILE) {
          fs.unlinkSync(TEMP_RESOLVER_FILE);
        }

        return result;
      });
    });
  }
}
