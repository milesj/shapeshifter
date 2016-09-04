/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable no-console, global-require */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import Factory from './Factory';
import SchemaReader from './SchemaReader';

export default class Transpiler {
  constructor(options) {
    this.options = options;
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
   * Transpile either a file or a folder by rendering each schema file.
   *
   * @param {String} target
   * @returns {Promise}
   */
  transpile(target) {
    return new Promise((resolve, reject) => {
      fs.stat(target, (error, stats) => {
        if (error) {
          reject(error);
          return;
        }

        if (stats.isDirectory()) {
          resolve(this.transpileFolder(target));
        } else if (stats.isFile()) {
          resolve(this.transpileFile(target));
        } else {
          reject('Unsupported file type.');
        }
      });
    });
  }

  /**
   * Transpile a folder by looping over all JS and JSON files and rendering them.
   *
   * @param {String} folderPath
   * @returns {Promise}
   */
  transpileFolder(folderPath) {
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
              ...schemas,
              ...this.extractSchemas(path.join(folderPath, filePath)),
            ];
          }
        });

        resolve(this.generateOutput(schemas));
      });
    });
  }

  /**
   * Transpile a file by rendering the schema at the defined path.
   *
   * @param {String} file
   * @returns {Promise}
   */
  transpileFile(file) {
    return this.generateOutput(this.extractSchemas(file));
  }

  /**
   * Extract a list of file paths based on references defined within the schema.
   *
   * @param {String} filePath
   * @returns {SchemaReader[]}
   */
  extractSchemas(filePath) {
    const basePath = path.dirname(filePath);
    const toResolve = [{ resolvePath: filePath }];
    const schemas = [];

    // Use `require()` as it handles JSON and JS files easily
    while (toResolve.length) {
      const { resolvePath, parentSchema, refKey } = toResolve.shift();

      // Only support JS and JSON
      if (!resolvePath.match(/\.(js|json)$/)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const schema = new SchemaReader(resolvePath, require(resolvePath), this.options);

      schemas.unshift(schema);

      // Assign to parent
      if (parentSchema && refKey) {
        parentSchema.referenceSchemas[refKey] = schema;
      }

      // Extract child references
      Object.keys(schema.references).forEach((ref) => {
        toResolve.push({
          resolvePath: path.normalize(path.join(basePath, schema.references[ref])),
          parentSchema: schema,
          refKey: ref,
        });
      });
    }

    return schemas;
  }

  /**
   * Generate the output by combining all schemas into a single output.
   *
   * @param {SchemaReader[]} schemas
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
      schemas.forEach((schema) => {
        if (rendered.has(schema.path)) {
          return;
        }

        const renderer = Factory.renderer(this.options, schema);

        renderer.parse();

        imports = new Set([...imports.values(), ...renderer.getImports()]);
        constants = new Set([...constants.values(), ...renderer.getConstants()]);
        header = new Set([...header.values(), ...renderer.getHeader()]);
        sets = new Set([...sets.values(), ...renderer.getSets()]);
        rendered.add(schema.path);
      });

      // Combine and filter the chunks
      const chunks = [];

      chunks.push(Array.from(imports.values()).join('\n'));
      chunks.push(Array.from(constants.values()).join('\n'));
      chunks.push(Array.from(header.values()).join('\n\n'));
      chunks.push(Array.from(sets.values()).join('\n\n'));

      resolve(`${chunks.filter(value => !!value).join('\n\n')}\n`);
    });
  }
}
