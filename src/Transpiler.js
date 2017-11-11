/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import fs from 'fs';
import path from 'path';
import Config, { bool, string } from 'optimal';
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
    this.options = new Config(options, {
      defaultNullable: bool(),
      importPath: string('shapeshifter'),
      includeAttributes: bool(),
      includeSchemas: bool(),
      includeTypes: bool(),
      indentCharacter: string('  '),
      renderer: string('react').oneOf(['react', 'flow', 'typescript']),
      stripPropTypes: bool(),
      useDefine: bool(),
    });
  }

  /**
   * Transpile either a file or a folder by rendering each schematic file.
   */
  /* istanbul ignore next */
  transpile(targets: string[]): Promise<string> {
    return Promise.all(targets.map(target => (
      new Promise((resolve: *, reject: *) => {
        fs.stat(target, (statError: ?Error, stats: fs.Stats) => {
          if (statError) {
            reject(statError);

            return;
          }

          const paths = [];

          try {
            if (stats.isDirectory()) {
              paths.push(
                ...fs.readdirSync(target).map(file => path.resolve(target, file)),
              );
            } else if (stats.isFile()) {
              paths.push(path.resolve(target));
            } else {
              throw new Error(`Unsupported file type: ${target}.`);
            }
          } catch (error) {
            reject(error);
          }

          resolve(paths);
        });
      })
    ))).then((targetPaths: string[][]) => (
      this.generate(targetPaths.reduce((paths: string[], target: string[]) => ([
        ...paths,
        ...target,
      ]), []))
    ));
  }

  /**
   * Transpile a folder by looping over all JS and JSON files and rendering them.
   */
  transpileFolder(folderPath: string): string {
    return this.generate(fs.readdirSync(folderPath).map(file => path.join(folderPath, file)));
  }

  /**
   * Transpile a file by rendering the schematic at the defined path.
   */
  transpileFile(filePath: string): string {
    return this.generate([filePath]);
  }

  /**
   * Extract a list of file paths based on references defined within the schematic.
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
          parentSchematic: schematic,
          refKey: ref,
          resolvePath: path.normalize(path.join(basePath, schematic.references[ref])),
        });
      });
    }

    return schematics;
  }

  /**
   * Generate the output by locating a schematic for every defined file path.
   */
  generate(filePaths: string[]): string {
    return this.generateOutput(filePaths.reduce((schematics, filePath) => ([
      ...schematics,
      ...this.extractSchematics(filePath),
    ]), []));
  }

  /**
   * Generate the output by combining all schematics into a single output.
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
    let output = '/* eslint-disable */\n// Automatically generated by shapeshifter. Do not modify!\n';
    const chunks = [];

    chunks.push(Array.from(imports.values()).join('\n'));
    chunks.push(Array.from(constants.values()).join('\n'));
    chunks.push(Array.from(header.values()).join('\n\n'));
    chunks.push(Array.from(schemas.values()).join('\n\n'));
    chunks.push(Array.from(relations.values()).join('\n\n'));
    chunks.push(Array.from(sets.values()).join('\n\n'));

    output += chunks.filter(Boolean).join('\n\n');
    output += '\n';

    return output;
  }
}
