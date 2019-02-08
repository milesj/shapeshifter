/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable global-require */

import fs from 'fs';
import path from 'path';
import optimal, { array, bool, string } from 'optimal';
import Builder, { TemplateList, TemplateMap } from './Builder';
import RendererFactory from './RendererFactory';
import Schematic from './Schematic';
import { Options, Parser, SchemaStructure, RendererType } from './types';

interface ResolveUnit {
  parentSchematic?: Schematic;
  refKey?: string;
  resolvePath: string;
}

export default class Transpiler {
  options: Options;

  constructor(options: Options) {
    this.options = optimal(options, {
      defaultNullable: bool(),
      defaultOptional: bool(),
      disableEslint: bool(),
      enums: bool(true),
      importPath: string('shapeshifter').notEmpty(),
      includeAttributes: bool(),
      includeDefinitions: bool(),
      includeSchemas: bool(),
      indentCharacter: string('  ').notEmpty(),
      inferPropTypesShape: bool(),
      renderers: array(string<RendererType>()).notEmpty(),
      schemaGenerics: bool(),
      stripPropTypes: bool(),
      suffix: bool(true),
      useDefine: bool(),
    });
  }

  /**
   * Default parser that handles JSON and JS files.
   */
  defaultParser(filePath: string): SchemaStructure {
    // eslint-disable-next-line import/no-dynamic-require
    return require(filePath);
  }

  /**
   * Load parser for the current extension.
   */
  loadParser(ext: string): Parser {
    if (ext === '.js' || ext === '.json') {
      return this.defaultParser;
    }

    if (ext === '.gql' || ext === '.graphql') {
      // eslint-disable-next-line import/no-extraneous-dependencies
      return require('shapeshifter-parser-graphql').default;
    }

    if (ext === '.yml' || ext === '.yaml') {
      // eslint-disable-next-line import/no-extraneous-dependencies
      return require('shapeshifter-parser-yaml').default;
    }

    throw new Error(`Unknown extension "${ext}". No compatible parser found.`);
  }

  /**
   * Transpile either a file or a folder by rendering each schematic file.
   */
  /* istanbul ignore next */
  transpile(targets: string[]): Promise<string> {
    return Promise.all(
      targets.map(target => {
        const stats = fs.statSync(target);
        const paths = [];

        if (stats.isDirectory()) {
          paths.push(...fs.readdirSync(target).map(file => path.resolve(target, file)));
        } else if (stats.isFile()) {
          paths.push(path.resolve(target));
        } else {
          throw new Error(`Unsupported file type: ${target}.`);
        }

        return paths;
      }),
    ).then(targetPaths =>
      this.generate(targetPaths.reduce((paths, target) => [...paths, ...target], [])),
    );
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
    const toResolve: ResolveUnit[] = [{ resolvePath: filePath }];
    const schematics = [];

    while (toResolve.length > 0) {
      const { resolvePath, parentSchematic, refKey } = toResolve.shift()!;

      if (path.basename(resolvePath).startsWith('.')) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const data = this.loadParser(path.extname(resolvePath))(resolvePath);
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
    return this.generateOutput(
      filePaths.reduce(
        (schematics: Schematic[], filePath: string) => [
          ...schematics,
          ...this.extractSchematics(filePath),
        ],
        [],
      ),
    );
  }

  /**
   * Generate the output by combining all schematics into a single output.
   */
  generateOutput(schematics: Schematic[]): string {
    const builder = new Builder();
    const rendered = new Set();

    if (this.options.disableEslint) {
      builder.comments.add('/* eslint-disable */');
    }

    // Wrap in a set to remove duplicates
    schematics.forEach((schematic: Schematic) => {
      if (rendered.has(schematic.path)) {
        return;
      }

      this.options.renderers.forEach(renderer => {
        RendererFactory.factory(renderer, this.options, builder, schematic).parse();

        rendered.add(schematic.path);
      });
    });

    // Combine and filter the chunks
    let output = '/* Automatically generated by shapeshifter. Do not modify! */\n';

    function addToOutput(set: TemplateList | TemplateMap, length: number = 1) {
      const list = Array.from(set.values()).filter(Boolean);

      if (list.length === 0) {
        return;
      }

      output += list.join('\n'.repeat(length));
      output += '\n\n';
    }

    addToOutput(builder.comments);
    addToOutput(builder.imports);
    addToOutput(builder.constants);
    addToOutput(builder.header, 2);
    addToOutput(builder.schemas, 2);
    addToOutput(builder.relations, 2);
    addToOutput(builder.sets, 2);

    return `${output.trim()}\n`;
  }
}
