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
  // Types
  'array', 'enum', 'instance', 'object', 'primitive', 'shape', 'union',
  // Syntax
  'imports', 'constants', 'sets',
];

// Fake a file object for the actual path
function fakeFile(path, content) {
  const actual = file(path);
  actual._stats = { isFile: () => true };
  actual._exists = true;
  actual._content = content;
  return actual;
}

describe('Compiler', function () {
  this.timeout(0);

  RENDERERS.forEach(renderer => {
    describe(`outputs ${renderer.name}`, function () {

      SUPPORTED_FORMATS.forEach(format => {
        describe(`from ${format.toUpperCase()} files`, function () {

          SCHEMA_CASES.forEach(schema => {
            it(`when rendering schema case "${schema}"`, function () {
              const actualPath = `${__dirname}/schemas/${format}/${schema}.${format}`;
              const expectedPath = `${__dirname}/expected/${renderer.key}/${schema}.js`;
              const output = new Compiler({ ...config, renderer: renderer.key })
                .compileFile(actualPath);

              expect(fakeFile(actualPath, output)).to.equal(file(expectedPath));
            });
          });
        });

        it('when rendering an entire folder into a single file', function (done) {
          const actualPath = `${__dirname}/schemas/${format}/`;
          const expectedPath = `${__dirname}/expected/${renderer.key}/all.js`;

          new Compiler({ ...config, renderer: renderer.key })
            .compileFolder(actualPath)
            .then(output => {
              expect(fakeFile(actualPath, output)).to.equal(file(expectedPath));
            })
            .then(done)
            .catch(done);
        });
      });
    });
  });
});
