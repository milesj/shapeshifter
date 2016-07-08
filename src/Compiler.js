/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

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
   * @param {String} folderPath
   * @returns {Promise}
   */
  compileFolder(folderPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (error, filePaths) => {
        if (error) {
          reject(error);
          return;
        }

        let schemas = [];

        filePaths.forEach(filePath => {
          if (filePath.match(/\.(js|json)$/)) {
            schemas = [
              ...this.extractSchemas(path.join(folderPath, filePath)),
              ...schemas,
            ];
          }
        });

        resolve(this.generateOutput(schemas));
      });
    });
  }

  /**
   * Compile a file by rendering the schema at the defined path.
   *
   * @param {String} file
   * @returns {Promise}
   */
  compileFile(file) {
    return this.generateOutput(this.extractSchemas(file));
  }

  /**
   * Extract a list of file paths based on references defined within the schema.
   *
   * @param {String} filePath
   * @returns {Schema[]}
   */
  extractSchemas(filePath) {
    const basePath = path.dirname(filePath);
    const pathsToResolve = [filePath];
    const schemas = [];

    // Use `require()` as it handles JSON and JS files easily
    while (pathsToResolve.length) {
      const resolvePath = pathsToResolve.shift();

      if (!resolvePath.match(/\.(js|json)$/)) {
        continue;
      }

      const schema = new Schema(require(resolvePath));

      schema.path = resolvePath;
      schemas.unshift(schema);

      Object.keys(schema.references).forEach(ref => {
        pathsToResolve.push(path.normalize(path.join(basePath, schema.references[ref])));
      });
    }

    return schemas;
  }

  /**
   * Generate the output by combining the header and body with the correct whitespace.
   *
   * @param {Schema[]} schemas
   * @returns {Promise}
   */
  generateOutput(schemas) {
    return new Promise((resolve) => {
      const rendered = new Set();
      let imports = new Set();
      let constants = new Set();
      let header = new Set();
      let sets = new Set();

      // Wrap in a set to remove duplicates
      schemas.forEach(schema => {
        if (rendered.has(schema.path)) {
          return;
        }

        const renderer = Factory.renderer(config.renderer, schema);

        renderer.parse();

        imports = new Set([...imports.values(), ...renderer.getImports()]);
        constants = new Set([...constants.values(), ...renderer.getConstants()]);
        header = new Set([...header.values(), ...renderer.getHeader()]);
        sets = new Set([...sets.values(), ...renderer.getSets()]);
        rendered.add(schema.path);
      });

      // Combine and filter the chunks
      const chunks = [];

      chunks.push(imports.values().join('\n'));
      chunks.push(constants.values().join('\n'));
      chunks.push(header.values().join('\n\n'));
      chunks.push(sets.values().join('\n\n'));

      resolve(`${chunks.filter(value => !!value).join('\n\n')}\n`);
    });
  }
}
