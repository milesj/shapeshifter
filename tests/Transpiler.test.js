import fs from 'fs';
import Transpiler from '../src/Transpiler';
import { options } from './mocks';

function file(path) {
  return fs.readFileSync(path, 'utf8');
}

// Supported renderers
const RENDERERS = [
  {
    name: 'Flow',
    key: 'flow',
    ext: 'js',
  },
  {
    name: 'PropTypes',
    key: 'prop-types',
    ext: 'js',
  },
  {
    name: 'TypeScript',
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
      'array',
      'enum',
      'instance',
      'object',
      'primitive',
      'shape',
      'union',
      'imports',
      'constants',
      'sets',
      'reference',
      'reference-self',
      'shape-reference',
      'polymorph',
    ],
  },
  {
    format: 'json',
    reader: 'node',
    cases: [
      'array',
      'enum',
      'instance',
      'object',
      'primitive',
      'shape',
      'union',
      'imports',
      'constants',
      'sets',
      'reference',
      'reference-self',
      'shape-reference',
      'polymorph',
    ],
  },
  {
    format: 'gql',
    reader: 'gql',
    cases: ['array', 'enum', 'primitive', 'shape', 'union', 'reference', 'reference-self', 'core'],
  },
];

describe('Transpiler', () => {
  describe('transpile()', () => {
    RENDERERS.forEach(({ name, key, ext }) => {
      describe(`outputs ${name}`, () => {
        FORMATS.forEach(({ format, reader, cases }) => {
          if (cases.length === 0) {
            return;
          }

          describe(`from ${format.toUpperCase()} files`, () => {
            cases.forEach(schema => {
              it(`when rendering schema case "${schema}"`, () => {
                const actualPath = `${__dirname}/schemas/${format}/${schema}.${format}`;
                const expectedPath = `${__dirname}/expected/${reader}/${key}/${schema}.${ext}`;

                const output = new Transpiler({
                  ...options,
                  renderers: [key],
                  includeDefinitions: true,
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
              renderers: [key],
              includeDefinitions: true,
            }).transpileFolder(actualPath);

            expect(output).toBe(file(expectedPath));
          });
        });
      });
    });

    // We only need to test functionality, not renderers here
    const otherOptions = {
      ...options,
      renderers: ['flow'],
      includeDefinitions: false,
      includeSchemas: false,
    };

    it('can include types through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-types.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeDefinitions: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can omit types through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/no-types.js`;

      const output = new Transpiler({ ...otherOptions }).transpileFile(actualPath);

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

      const output = new Transpiler({ ...otherOptions }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can include types and schemas through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/with-types-schemas.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeDefinitions: true,
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
        includeDefinitions: true,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('supports compound keys through the primary key metadata', () => {
      const actualPath = `${__dirname}/schemas/compound-key.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/compound-key.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeDefinitions: true,
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
        includeDefinitions: true,
        stripPropTypes: true,
        renderers: ['prop-types'],
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can customize the import path through configuration', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/import-path.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeSchemas: true,
        importPath: 'some-other-schema-library',
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can toggle eslint disable setting', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/eslint-enabled.js`;

      const output = new Transpiler({
        ...otherOptions,
        disableEslint: false,
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });

    it('can render multiple languages', () => {
      const actualPath = `${__dirname}/schemas/types-schemas.json`;
      const expectedPath = `${__dirname}/expected/shapeshifter/multiple-renderers.js`;

      const output = new Transpiler({
        ...otherOptions,
        includeDefinitions: true,
        includeSchemas: true,
        renderers: ['prop-types', 'flow'],
      }).transpileFile(actualPath);

      expect(output).toBe(file(expectedPath));
    });
  });

  describe('extractSchematics()', () => {
    it('handles reference paths correctly', () => {
      const schematics = new Transpiler(options).extractSchematics(
        `${__dirname}/schemas/json/reference.json`,
      );

      expect(schematics.map(schematic => schematic.path)).toEqual([
        `${__dirname}/schemas/json/reference-bar.json`,
        `${__dirname}/schemas/json/reference-set.json`,
        `${__dirname}/schemas/json/reference-foo.json`,
        `${__dirname}/schemas/json/reference.json`,
      ]);
    });
  });
});
