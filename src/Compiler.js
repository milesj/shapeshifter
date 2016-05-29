/* eslint-disable no-console, global-require */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import config from './config';
import Factory from './Factory';
import Schema from './Schema';

export default class Compiler {
  constructor(options) {
    config.defaultNull = options.null;
    config.defaultRequired = options.required;
    config.indentCharacter = options.indent;
    config.renderer = options.renderer;
    config.schemaSuffix = options.suffix;
  }

  /**
   * Output the rendered schema to stdout.
   *
   * @param {String} value
   */
  static output(value) {
    console.log(value);
  }

  /**
   * Output any caught errors to stderr.
   *
   * @param {Error|String} error
   */
  static error(error) {
    const message = (error instanceof Error) ? error.message : error;

    console.error(chalk.bgRed.white(message));
    process.exit(1);
  }

  /**
   * Compile either a file or a folder by rendering each schema file.
   *
   * @param {String} target
   * @returns {Promise}
   */
  compile(target) {
    return new Promise((resolve, reject) => {
      fs.stat(target, (error, stats) => {
        if (error) {
          reject(error);
          return;
        }

        if (stats.isDirectory()) {
          resolve(this.compileFolder(target));
        } else if (stats.isFile()) {
          resolve(this.compileFile(target));
        } else {
          reject('Unsupported file type.');
        }
      });
    });
  }

  /**
   * Compile a folder by looping over all JS and JSON files and rendering them.
   *
   * @param {String} folder
   * @returns {Promise}
   */
  compileFolder(folder) {
    return new Promise((resolve, reject) => {
      fs.readdir(folder, (error, files) => {
        if (error) {
          reject(error);
          return;
        }

        const output = [];

        files.forEach(file => {
          if (file.match(/\.(js|json)$/)) {
            output.push(this.compileFile(path.join(folder, file)));
          }
        });

        resolve(output.join('\n\n'));
      });
    });
  }

  /**
   * Compile a file by rendering the schema at the defined path.
   *
   * @param {String} file
   * @returns {String}
   */
  compileFile(file) {
    // Use require() as it handles JSON and JS files easily
    return Factory.renderer(config.renderer, new Schema(require(file))).render();
  }
}
