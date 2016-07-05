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
    process.exit(0);
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

        // Use sets so that duplicates are removed
        let imports = new Set();
        let constants = new Set();
        let header = new Set();
        let sets = new Set();

        files.forEach(file => {
          if (file.match(/\.(js|json)$/)) {
            const renderer = this.createRenderer(path.join(folder, file));

            renderer.parse();

            imports = new Set([...imports.values(), ...renderer.getImports()]);
            constants = new Set([...constants.values(), ...renderer.getConstants()]);
            header = new Set([...header.values(), ...renderer.getHeader()]);
            sets = new Set([...sets.values(), ...renderer.getSets()]);
          }
        });

        resolve(this.generateOutput(
          Array.from(imports.values()),
          Array.from(constants.values()),
          Array.from(header.values()),
          Array.from(sets.values())
        ));
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

    renderer.parse();

    return this.generateOutput(
      renderer.getImports(),
      renderer.getConstants(),
      renderer.getHeader(),
      renderer.getSets()
    );
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
   * @param {String[]} imports
   * @param {String[]} constants
   * @param {String[]} header
   * @param {String[]} body
   * @returns {string}
   */
  generateOutput(imports, constants, header, body) {
    const chunks = [];

    chunks.push(imports.join('\n'));
    chunks.push(constants.join('\n'));
    chunks.push(header.join('\n\n'));
    chunks.push(body.join('\n\n'));

    return `${chunks.filter(value => !!value).join('\n\n')}\n`;
  }
}
