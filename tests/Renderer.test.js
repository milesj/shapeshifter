/* eslint-disable no-underscore-dangle */

import chai, { expect } from 'chai';
import chaiFiles, { file } from 'chai-files';
import Compiler from '../lib/Compiler';
import config from '../lib/config';

chai.use(chaiFiles);

// Supported renderers
const RENDERERS = [
  { name: 'React PropTypes', key: 'react' },
];

// Supported schema file formats
const SUPPORTED_FORMATS = ['json', 'js'];

// Mocked schemas to use in unit tests
const SCHEMA_CASES = [
  'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
];

describe('Renderer', () => {

  RENDERERS.forEach(renderer => {
    describe(`outputs ${renderer.name}`, () => {

      SUPPORTED_FORMATS.forEach(format => {
        describe(`from ${format.toUpperCase()} files`, () => {

          SCHEMA_CASES.forEach(schema => {
            it(`when rendering schema case "${schema}"`, () => {
              const actualPath = `${__dirname}/schemas/${format}/${schema}.${format}`;
              const expectedPath = `${__dirname}/expected/${renderer.key}/${schema}.js`;

              // Fake a file object for the actual path
              const actual = file(actualPath);
              actual._stats = { isFile: () => true };
              actual._exists = true;
              actual._content = new Compiler({
                ...config,
                renderer: renderer.key,
              }).compileFile(actualPath);

              expect(actual).to.equal(file(expectedPath));
            });
          });
        });
      });
    });
  });
});
