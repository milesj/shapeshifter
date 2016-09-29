/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/* eslint-disable no-console, global-require */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import Factory from './Factory';
import SchemaReader from './SchemaReader';

import type { Options } from './types';

type ResolveList = {
  resolvePath: string,
  parentReader?: SchemaReader,
  refKey?: string,
};

export default class Transpiler {
  options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  /**
   * Output the rendered reader to stdout.
   *
   * @param {String} value
   */
  static output(value: string) {
    console.log(value);
    process.exit(0);
  }

  /**
   * Output any caught errors to stderr.
   *
   * @param {Error|String} error
   */
  static error(error: Error | string) {
    const message = (error instanceof Error) ? error.message : error;

    console.error(chalk.bgRed.white(message));
    process.exit(1);
  }

  /**
   * Transpile either a file or a folder by rendering each reader file.
   *
   * @param {String} target
   * @returns {Promise}
   */
  transpile(target: string): Promise<string> {
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
  transpileFolder(folderPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (error, filePaths) => {
        if (error) {
          reject(error);
          return;
        }

        let readers = [];

        filePaths.forEach((filePath) => {
          if (filePath.match(/\.(js|json)$/)) {
            readers = [
              ...readers,
              ...this.extractReaders(path.join(folderPath, filePath)),
            ];
          }
        });

        resolve(this.generateOutput(readers));
      });
    });
  }

  /**
   * Transpile a file by rendering the reader at the defined path.
   *
   * @param {String} file
   * @returns {Promise}
   */
  transpileFile(file: string): Promise<string> {
    return this.generateOutput(this.extractReaders(file));
  }

  /**
   * Extract a list of file paths based on references defined within the reader.
   *
   * @param {String} filePath
   * @returns {SchemaReader[]}
   */
  extractReaders(filePath: string): SchemaReader[] {
    const basePath = path.dirname(filePath);
    const toResolve: ResolveList[] = [{ resolvePath: filePath }];
    const readers = [];

    // Use `require()` as it handles JSON and JS files easily
    while (toResolve.length) {
      const { resolvePath, parentReader, refKey } = toResolve.shift();

      // Only support JS and JSON
      if (!resolvePath.match(/\.(js|json)$/)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      /* eslint-disable */
      // $FlowIssue `resolvePath` cannot be a literal string
      const reader = new SchemaReader(resolvePath, require(resolvePath), this.options);
      /* eslint-enable */

      readers.unshift(reader);

      // Assign to parent
      if (parentReader && refKey) {
        parentReader.referenceReaders[refKey] = reader;
      }

      // Extract child references
      Object.keys(reader.references).forEach((ref) => {
        toResolve.push({
          resolvePath: path.normalize(path.join(basePath, reader.references[ref])),
          parentReader: reader,
          refKey: ref,
        });
      });
    }

    return readers;
  }

  /**
   * Generate the output by combining all readers into a single output.
   *
   * @param {SchemaReader[]} readers
   * @returns {Promise}
   */
  generateOutput(readers: SchemaReader[]): Promise<string> {
    return new Promise((resolve) => {
      const rendered = new Set();
      let imports = new Set();
      let constants = new Set();
      let header = new Set();
      let schemas = new Set();
      let relations = new Set();
      let sets = new Set();

      // Wrap in a set to remove duplicates
      readers.forEach((reader) => {
        if (rendered.has(reader.path)) {
          return;
        }

        const renderer = Factory.renderer(this.options, reader);

        renderer.parse();

        imports = new Set([
          ...Array.from(imports.values()),
          ...renderer.getImports(),
        ]);

        constants = new Set([
          ...Array.from(constants.values()),
          ...renderer.getConstants(),
        ]);

        header = new Set([
          ...Array.from(header.values()),
          ...renderer.getHeader(),
        ]);

        schemas = new Set([
          ...Array.from(schemas.values()),
          ...renderer.getSchemas(),
        ]);

        relations = new Set([
          ...Array.from(relations.values()),
          ...renderer.getRelations(),
        ]);

        sets = new Set([
          ...Array.from(sets.values()),
          ...renderer.getSets(),
        ]);

        rendered.add(reader.path);
      });

      // Combine and filter the chunks
      const chunks = [];

      chunks.push(Array.from(imports.values()).join('\n'));
      chunks.push(Array.from(constants.values()).join('\n'));
      chunks.push(Array.from(header.values()).join('\n\n'));
      chunks.push(Array.from(schemas.values()).join('\n\n'));
      chunks.push(Array.from(relations.values()).join('\n\n'));
      chunks.push(Array.from(sets.values()).join('\n\n'));

      resolve(`${chunks.filter(value => !!value).join('\n\n')}\n`);
    });
  }
}
