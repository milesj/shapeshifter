/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/* eslint-disable no-console, global-require */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import RendererFactory from './RendererFactory';
import Schematic from './Schematic';
import readWithNode from './readers/node';
import readWithGraphQL from './readers/graphql';

import type { Options } from './types';

type ResolveList = {
  parentSchematic?: Schematic,
  refKey?: string,
  resolvePath: string,
};

export default class Transpiler {
  options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  /**
   * Output the rendered schema to stdout.
   *
   * @param {String} value
   */
   /* istanbul ignore next */
  static output(value: string) {
    console.log(value);
    process.exit(0);
  }

  /**
   * Output any caught errors to stderr.
   *
   * @param {Error|String} error
   */
  /* istanbul ignore next */
  static error(error: Error | string) {
    let message = '';
    let stack = [];

    if (error instanceof Error) {
      message = `  ${error.message}  `;

      stack = error.stack.split('\n');
      stack.shift();
      stack.pop();
    } else {
      message = `  ${error}  `;
    }

    // Pad the primary message
    let length = message.length;
    let padding = '';

    while (length > 0) {
      padding += ' ';
      length -= 1;
    }

    // Output the errors
    console.error(padding);
    console.error(chalk.bgRed.white(padding));
    console.error(chalk.bgRed.white(message));
    console.error(chalk.bgRed.white(padding));
    console.error(padding);
    console.error(chalk.gray(stack.join('\n')));
    console.error(padding);

    process.exit(1);
  }

  /**
   * Transpile either a file or a folder by rendering each schematic file.
   *
   * @param {String} target
   * @returns {Promise}
   */
  /* istanbul ignore next */
  transpile(target: string): Promise<string> {
    return new Promise((
      resolve: (result: string) => void,
      reject: (error: Error) => void,
    ) => {
      fs.stat(target, (error: ?Error, stats: fs.Stats) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          if (stats.isDirectory()) {
            resolve(this.transpileFolder(target));
          } else if (stats.isFile()) {
            resolve(this.transpileFile(target));
          } else {
            reject(new Error('Unsupported file type.'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  /**
   * Transpile a folder by looping over all JS and JSON files and rendering them.
   *
   * @param {String} folderPath
   * @returns {String}
   */
  transpileFolder(folderPath: string): string {
    const filePaths = fs.readdirSync(folderPath);
    let schematics = [];

    filePaths.forEach((filePath: string) => {
      schematics = [
        ...schematics,
        ...this.extractSchematics(path.join(folderPath, filePath)),
      ];
    });

    return this.generateOutput(schematics);
  }

  /**
   * Transpile a file by rendering the schematic at the defined path.
   *
   * @param {String} file
   * @returns {String}
   */
  transpileFile(file: string): string {
    return this.generateOutput(this.extractSchematics(file));
  }

  /**
   * Extract a list of file paths based on references defined within the schematic.
   *
   * @param {String} filePath
   * @returns {Schematic[]}
   */
  extractSchematics(filePath: string): Schematic[] {
    const basePath = path.dirname(filePath);
    const toResolve: ResolveList[] = [{ resolvePath: filePath }];
    const schematics = [];

    // Use `require()` as it handles JSON and JS files easily
    while (toResolve.length) {
      const { resolvePath, parentSchematic, refKey } = toResolve.shift();
      const pathExt = path.extname(resolvePath);
      let data = null;

      /* istanbul ignore else */
      if (pathExt === '.js' || pathExt === '.json') {
        data = readWithNode(resolvePath);
      } else if (pathExt === '.gql' || pathExt === '.graphql') {
        data = readWithGraphQL(resolvePath);
      } else {
        // eslint-disable-next-line no-continue
        continue;
      }

      const schematic = new Schematic(resolvePath, data, this.options);

      schematics.unshift(schematic);

      // Assign to parent
      if (parentSchematic && refKey) {
        parentSchematic.referenceSchematics[refKey] = schematic;
      }

      // Extract child references
      Object.keys(schematic.references).forEach((ref: string) => {
        toResolve.push({
          resolvePath: path.normalize(path.join(basePath, schematic.references[ref])),
          parentSchematic: schematic,
          refKey: ref,
        });
      });
    }

    return schematics;
  }

  /**
   * Generate the output by combining all schematics into a single output.
   *
   * @param {Schematic[]} schematics
   * @returns {String}
   */
  generateOutput(schematics: Schematic[]): string {
    const rendered = new Set();
    let imports = new Set();
    let constants = new Set();
    let header = new Set();
    let schemas = new Set();
    let relations = new Set();
    let sets = new Set();

    // Wrap in a set to remove duplicates
    schematics.forEach((schematic: Schematic) => {
      if (rendered.has(schematic.path)) {
        return;
      }

      const renderer = RendererFactory.factory(this.options, schematic);

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

      rendered.add(schematic.path);
    });

    // Combine and filter the chunks
    const chunks = [];

    chunks.push(Array.from(imports.values()).join('\n'));
    chunks.push(Array.from(constants.values()).join('\n'));
    chunks.push(Array.from(header.values()).join('\n\n'));
    chunks.push(Array.from(schemas.values()).join('\n\n'));
    chunks.push(Array.from(relations.values()).join('\n\n'));
    chunks.push(Array.from(sets.values()).join('\n\n'));

    return `${chunks.filter(value => !!value).join('\n\n')}\n`;
  }
}
