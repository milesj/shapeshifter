/* eslint-disable no-console, global-require */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import config from './config';
import Factory from './Factory';
import Schema from './Schema';

export default class Compiler {
  constructor(options) {
    config.defaultNull = options.defaultNull;
    config.defaultRequired = options.defaultRequired;
    config.indentCharacter = options.indentCharacter;
    config.renderer = options.renderer;
    config.schemaSuffix = options.schemaSuffix;
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

        let header = [this.createRenderer().getHeader()];
        let output = [];

        files.forEach(file => {
          if (file.match(/\.(js|json)$/)) {
            const renderer = this.createRenderer(path.join(folder, file));

            header = header.concat(renderer.getImports());
            output = [
              ...output,
              renderer.getConstants().join('\n'),
              ...renderer.getSets(),
            ];
          }
        });

        resolve(this.generateOutput(header, output));
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
    const renderer = this.createRenderer(file);

    return this.generateOutput([
      renderer.getHeader(),
      ...renderer.getImports(),
    ], [
      renderer.getConstants().join('\n'),
      ...renderer.getSets(),
    ]);
  }

  /**
   * Create a renderer with a schema found at the defined file path.
   *
   * @param {String} [file]
   * @returns {Renderer}
   */
  createRenderer(file) {
    // Use `require()` as it handles JSON and JS files easily
    return Factory.renderer(config.renderer, file ? new Schema(require(file)) : null);
  }

  /**
   * Generate the output by combining the header and body with the correct whitespace.
   *
   * @param {String[]} header
   * @param {String[]} body
   * @returns {string}
   */
  generateOutput(header, body) {
    const filter = value => !!value;

    return `${header.filter(filter).join('\n')}\n\n${body.filter(filter).join('\n\n')}\n`;
  }
}
