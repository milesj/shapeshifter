/* eslint-disable no-underscore-dangle */

import chai, { expect } from 'chai';
import chaiFiles, { file } from 'chai-files';
import Transpiler from '../src/Transpiler';
import { options } from './mocks';

chai.use(chaiFiles);

// Supported renderers
const RENDERERS = [
  { name: 'React prop types', key: 'react', ext: 'js' },
  { name: 'Flow types', key: 'flow', ext: 'js' },
  { name: 'TypeScript interfaces', key: 'typescript', ext: 'ts' },
];

// Supported schema file formats
const SUPPORTED_FORMATS = ['json', 'js'];

// Mocked schemas to use in unit tests
const SCHEMA_CASES = [
  // Types
  'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
  // Syntax
  'imports', 'constants', 'sets', 'reference', 'reference-self', 'shape-reference',
];

describe('Transpiler', function () {
  this.timeout(0);

  describe('transpile()', () => {
    RENDERERS.forEach((renderer) => {
      describe(`outputs ${renderer.name}`, function () {

        SUPPORTED_FORMATS.forEach((format) => {
          describe(`from ${format.toUpperCase()} files`, function () {

            SCHEMA_CASES.forEach((schema) => {
              it(`when rendering schema case "${schema}"`, function () {
                const actualPath = `${__dirname}/schemas/${format}/${schema}.${format}`;
                const expectedPath = `${__dirname}/expected/${renderer.key}/${schema}.${renderer.ext}`;

                const output = new Transpiler({
                  ...options,
                  renderer: renderer.key,
                  includeTypes: true,
                }).transpileFile(actualPath);

                expect(output).to.equal(file(expectedPath));
              });
            });
          });

          it('when rendering an entire folder into a single file', function () {
            const actualPath = `${__dirname}/schemas/${format}/`;
            const expectedPath = `${__dirname}/expected/${renderer.key}/all.${renderer.ext}`;

            const output = new Transpiler({
              ...options,
              renderer: renderer.key,
              includeTypes: true,
            }).transpileFolder(actualPath);

            expect(output).to.equal(file(expectedPath));
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

      expect(output).to.equal(file(expectedPath));
    });

    it('can omit types through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/no-types.js`;

      const output = new Transpiler({ ...otherOptions })
        .transpileFile(actualPath);

      expect(output).to.equal(file(expectedPath));
    });

    it('can include schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-schemas.js`;

      const output = new Transpiler({ ...otherOptions, includeSchemas: true })
        .transpileFile(actualPath);

      expect(output).to.equal(file(expectedPath));
    });

    it('can include schemas with attributes through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-schemas-attributes.js`;

      const output = new Transpiler({ ...otherOptions, includeSchemas: true, includeAttributes: true })
        .transpileFile(actualPath);

      expect(output).to.equal(file(expectedPath));
    });

    it('can omit schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/no-schemas.js`;

      const output = new Transpiler({ ...otherOptions })
        .transpileFile(actualPath);

      expect(output).to.equal(file(expectedPath));
    });

    it('can include schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-types-schemas.js`;

      const output = new Transpiler({ ...otherOptions, includeTypes: true, includeSchemas: true })
        .transpileFile(actualPath);

      expect(output).to.equal(file(expectedPath));
    });
  });

  describe('extractReaders()', () => {
    it('handles reference paths correctly', () => {
      const readers = new Transpiler(options).extractReaders(`${__dirname}/schemas/json/reference.json`);

      expect(readers.map(reader => reader.path)).to.deep.equal([
        `${__dirname}/schemas/json/reference-bar.json`,
        `${__dirname}/schemas/json/reference-set.json`,
        `${__dirname}/schemas/json/reference-foo.json`,
        `${__dirname}/schemas/json/reference.json`,
      ]);
    });
  });
});
