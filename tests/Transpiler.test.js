/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import Transpiler from '../src/Transpiler';
import { options } from './mocks';

function file(path) {
  return fs.readFileSync(path, 'utf8');
}

// Supported renderers
const RENDERERS = [
  {
    name: 'React prop types',
    key: 'react',
    ext: 'js',
  },
  {
    name: 'Flow types',
    key: 'flow',
    ext: 'js',
  },
  {
    name: 'TypeScript interfaces',
    key: 'typescript',
    ext: 'ts',
  },
];

// Supported schema file formats
const FORMATS = [
  {
    format: 'js',
    reader: 'node',
    cases: [
      'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
      'imports', 'constants', 'sets', 'reference', 'reference-self', 'shape-reference',
    ],
  },
  {
    format: 'json',
    reader: 'node',
    cases: [
      'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
      'imports', 'constants', 'sets', 'reference', 'reference-self', 'shape-reference',
    ],
  },
  {
    format: 'gql',
    reader: 'gql',
    cases: [
      'array', 'enum', 'primitive', 'shape', 'union', 'reference', 'reference-self', 'core',
    ],
  },
];

describe('Transpiler', () => {
  describe('transpile()', () => {
    RENDERERS.forEach(({ name, key, ext }) => {
      describe(`outputs ${name}`, () => {

        FORMATS.forEach(({ format, reader, cases }) => {
          describe(`from ${format.toUpperCase()} files`, () => {

            cases.forEach((schema) => {
              it(`when rendering schema case "${schema}"`, () => {
                const actualPath = `${__dirname}/schemas/${format}/${schema}.${format}`;
                const expectedPath = `${__dirname}/expected/${reader}/${key}/${schema}.${ext}`;

                const output = new Transpiler({
                  ...options,
                  renderer: key,
                  includeTypes: true,
                }).transpileFile(actualPath);

                expect(output).toBe(file(expectedPath));
              });
            });
          });

          it('when rendering an entire folder into a single file', () => {
            const actualPath = `${__dirname}/schemas/${format}/`;
            const expectedPath = `${__dirname}/expected/${reader}/${key}/all.${ext}`;

            const output = new Transpiler({
              ...options,
              renderer: key,
              includeTypes: true,
            }).transpileFolder(actualPath);

            expect(output).toBe(file(expectedPath));
          });
        });
      });
    });

    // We only need to test functionality, not renderers here
    const otherOptions = {
      ...options,
      renderer: 'flow',
      includeTypes: false,
      includeSchemas: false,
    };

    it('can include types through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-types.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeTypes: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can omit types through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/no-types.js`;

      const output = new Transpiler({ ...otherOptions })
        .transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can include schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-schemas.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeSchemas: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can include schemas with attributes through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-schemas-attributes.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeSchemas: true,
        includeAttributes: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can omit schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/no-schemas.js`;

      const output = new Transpiler({ ...otherOptions })
        .transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can include types and schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-types-schemas.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeTypes: true,
        includeSchemas: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can include extra metadata', () => {
      const actualPath = `${__dirname}/schemas/extra-metadata.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-extra-metadata.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeSchemas: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('will omit schemas if no resource name is defined', () => {
      const actualPath = `${__dirname}/schemas/optional-schema.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/optional-schema.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeSchemas: true,
        includeTypes: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('supports compound keys through the primary key metadata', () => {
      const actualPath = `${__dirname}/schemas/compound-key.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/compound-key.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeTypes: true,
        includeSchemas: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('supports a compact view', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-schemas-compact.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeSchemas: true,
        useDefine: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('wraps prop types when in production', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/wrapped-prop-types.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeTypes: true,
        stripPropTypes: true,
        renderer: 'react',
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });
  });

  describe('extractSchematics()', () => {
    it('handles reference paths correctly', () => {
      const schematics = new Transpiler(options)
        .extractSchematics(`${__dirname}/schemas/json/reference.json`);

      expect(schematics.map(schematic => schematic.path)).toEqual([
        `${__dirname}/schemas/json/reference-bar.json`,
        `${__dirname}/schemas/json/reference-set.json`,
        `${__dirname}/schemas/json/reference-foo.json`,
        `${__dirname}/schemas/json/reference.json`,
      ]);
    });
  });
});
