/* eslint-disable no-underscore-dangle */

import chai, { expect } from 'chai';
import chaiFiles, { file } from 'chai-files';
import Transpiler from '../lib/Transpiler';
import { options } from './mocks';

chai.use(chaiFiles);

// Supported renderers
const RENDERERS = [
  { name: 'React PropTypes', key: 'react', ext: 'js' },
  { name: 'Flow Types', key: 'flow', ext: 'js' },
  { name: 'TypeScript Types', key: 'typescript', ext: 'ts' },
];

// Supported schema file formats
const SUPPORTED_FORMATS = ['json', 'js'];

// Mocked schemas to use in unit tests
const SCHEMA_CASES = [
  // Types
  'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
  // Syntax
  'imports', 'constants', 'sets', 'reference', 'reference-self',
];

describe('Transpiler', function () {
  this.timeout(0);

  describe('transpile()', () => {
    RENDERERS.forEach(renderer => {
      describe(`outputs ${renderer.name}`, function () {

        SUPPORTED_FORMATS.forEach(format => {
          describe(`from ${format.toUpperCase()} files`, function () {

            SCHEMA_CASES.forEach(schema => {
              it(`when rendering schema case "${schema}"`, function () {
                const actualPath = `${__dirname}/schemas/${format}/${schema}.${format}`;
                const expectedPath = `${__dirname}/expected/${renderer.key}/${schema}.${renderer.ext}`;

                return new Transpiler({ ...options, renderer: renderer.key })
                  .transpileFile(actualPath)
                  .then(output => expect(output).to.equal(file(expectedPath)));
              });
            });
          });

          it('when rendering an entire folder into a single file', function () {
            const actualPath = `${__dirname}/schemas/${format}/`;
            const expectedPath = `${__dirname}/expected/${renderer.key}/all.${renderer.ext}`;

            return new Transpiler({ ...options, renderer: renderer.key })
              .transpileFolder(actualPath)
              .then(output => expect(output).to.equal(file(expectedPath)));
          });
        });
      });
    });

    /* it('can omit types through configuration', () => (
      new Transpiler({ ...options, includeTypes: false })
        .transpileFile(`${__dirname}/schemas/json/primitive.json`)
        .then(output => expect(output).to.equal(''))
    )); */
  });

  describe('extractSchemas()', () => {
    it('handles reference paths correctly', () => {
      const schemas = new Transpiler(options).extractSchemas(`${__dirname}/schemas/json/reference.json`);

      expect(schemas.map(schema => schema.path)).to.deep.equal([
        `${__dirname}/schemas/json/reference-bar.json`,
        `${__dirname}/schemas/json/reference-set.json`,
        `${__dirname}/schemas/json/reference-foo.json`,
        `${__dirname}/schemas/json/reference.json`,
      ]);
    });
  });
});
