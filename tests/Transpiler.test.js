/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import Transpiler from '../src/Transpiler';
import { options } from './mocks';

function file(path) {
  return fs.readFileSync(path, 'utf8');
}

// Supported renderers
const RENDERERS = [
  { name: 'React prop types', key: 'react', ext: 'js' },
  { name: 'Flow types', key: 'flow', ext: 'js' },
  { name: 'TypeScript interfaces', key: 'typescript', ext: 'ts' },
];

// Supported schema file formats
const SUPPORTED_FORMATS = [
  {
    format: 'js',
    expected: '',
    cases: [
      'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
      'imports', 'constants', 'sets', 'reference', 'reference-self', 'shape-reference',
    ],
  },
  {
    format: 'json',
    expected: '',
    cases: [
      'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
      'imports', 'constants', 'sets', 'reference', 'reference-self', 'shape-reference',
    ],
  },
  /* {
    format: 'gql',
    expected: '-gql',
    cases: [
      'primitive',
    ],
  }, */
];

describe('Transpiler', function () {
  describe('transpile()', () => {
    RENDERERS.forEach((renderer) => {
      describe(`outputs ${renderer.name}`, function () {

        SUPPORTED_FORMATS.forEach(({ format, expected, cases }) => {
          describe(`from ${format.toUpperCase()} files`, function () {

            cases.forEach((schema) => {
              it(`when rendering schema case "${schema}"`, function () {
                const actualPath = `${__dirname}/schemas/${format}/${schema}.${format}`;
                const expectedPath = `${__dirname}/expected/${renderer.key}${expected}/${schema}.${renderer.ext}`;

                const output = new Transpiler({
                  ...options,
                  renderer: renderer.key,
                  includeTypes: true,
                }).transpileFile(actualPath);

                expect(output).toBe(file(expectedPath));
              });
            });
          });

          it('when rendering an entire folder into a single file', function () {
            const actualPath = `${__dirname}/schemas/${format}/`;
            const expectedPath = `${__dirname}/expected/${renderer.key}${expected}/all.${renderer.ext}`;

            const output = new Transpiler({
              ...options,
              renderer: renderer.key,
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

      const output = new Transpiler({ ...otherOptions, includeTypes: true })
        .transpileFile(actualPath);

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

      const output = new Transpiler({ ...otherOptions, includeSchemas: true })
        .transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can include schemas with attributes through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-schemas-attributes.js`;

      const output = new Transpiler({ ...otherOptions, includeSchemas: true, includeAttributes: true })
        .transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can omit schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/no-schemas.js`;

      const output = new Transpiler({ ...otherOptions })
        .transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can include schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-types-schemas.js`;

      const output = new Transpiler({ ...otherOptions, includeTypes: true, includeSchemas: true })
        .transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });
  });

  describe('extractSchematics()', () => {
    it('handles reference paths correctly', () => {
      const schematics = new Transpiler(options).extractSchematics(`${__dirname}/schemas/json/reference.json`);

      expect(schematics.map(schematic => schematic.path)).toEqual([
        `${__dirname}/schemas/json/reference-bar.json`,
        `${__dirname}/schemas/json/reference-set.json`,
        `${__dirname}/schemas/json/reference-foo.json`,
        `${__dirname}/schemas/json/reference.json`,
      ]);
    });
  });
});
