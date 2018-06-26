import fs from 'fs';
import path from 'path';
import Transpiler from '../src/Transpiler';
import { options } from '../../../tests/mocks';

function file(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

const TEST_ROOT = path.join(__dirname, '../../../tests');

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
const cases = [
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
];

const FORMATS = [
  {
    format: 'js',
    target: 'common',
    cases,
  },
  {
    format: 'json',
    target: 'common',
    cases,
  },
  {
    format: 'yml',
    target: 'common',
    cases,
  },
  {
    format: 'gql',
    target: 'graphql',
    cases: ['array', 'enum', 'primitive', 'shape', 'union', 'reference', 'reference-self', 'core'],
  },
];

describe('Transpiler', () => {
  describe('transpile()', () => {
    RENDERERS.forEach(({ name, key, ext }) => {
      describe(`outputs ${name}`, () => {
        FORMATS.forEach(({ format, target, cases: testCases }) => {
          if (testCases.length === 0) {
            return;
          }

          describe(`from ${format.toUpperCase()} files`, () => {
            testCases.forEach(schema => {
              it(`when rendering schema case "${schema}"`, () => {
                const actualPath = `${TEST_ROOT}/schemas/${format}/${schema}.${format}`;
                const expectedPath = `${TEST_ROOT}/expected/${target}/${key}/${schema}.${ext}`;

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
            const actualPath = `${TEST_ROOT}/schemas/${format}/`;
            const expectedPath = `${TEST_ROOT}/expected/${target}/${key}/all.${ext}`;

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
  });

  // We only need to test functionality, not renderers here
  const otherOptions = {
    ...options,
    renderers: ['flow'],
    includeDefinitions: false,
    includeSchemas: false,
  };

  it('can include types through configuration', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/with-types.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can omit types through configuration', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/no-types.js`;

    const output = new Transpiler({ ...otherOptions }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can include schemas through configuration', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/with-schemas.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeSchemas: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can include schemas with attributes through configuration', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/with-schemas-attributes.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeSchemas: true,
      includeAttributes: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can omit schemas through configuration', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/no-schemas.js`;

    const output = new Transpiler({ ...otherOptions }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can include types and schemas through configuration', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/with-types-schemas.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      includeSchemas: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can include extra metadata', () => {
    const actualPath = `${TEST_ROOT}/schemas/extra-metadata.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/with-extra-metadata.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeSchemas: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('will omit schemas if no resource name is defined', () => {
    const actualPath = `${TEST_ROOT}/schemas/optional-schema.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/optional-schema.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeSchemas: true,
      includeDefinitions: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('supports compound keys through the primary key metadata', () => {
    const actualPath = `${TEST_ROOT}/schemas/compound-key.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/compound-key.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      includeSchemas: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('supports a compact view', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/with-schemas-compact.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeSchemas: true,
      useDefine: true,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('wraps prop types when in production', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/wrapped-prop-types.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      stripPropTypes: true,
      renderers: ['prop-types'],
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can customize the import path through configuration', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/import-path.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeSchemas: true,
      importPath: 'some-other-schema-library',
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can toggle eslint disable setting', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/eslint-enabled.js`;

    const output = new Transpiler({
      ...otherOptions,
      disableEslint: false,
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('can render multiple languages', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/multiple-renderers.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      includeSchemas: true,
      renderers: ['prop-types', 'flow'],
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('infers prop types shapes for typescript', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/typescript/infer-prop-types.ts`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      includeSchemas: true,
      inferPropTypesShape: true,
      renderers: ['prop-types', 'typescript'],
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('infers prop types shapes and defined schema generics for typescript', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/typescript/infer-and-schema-generics.ts`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      includeSchemas: true,
      inferPropTypesShape: true,
      schemaGenerics: true,
      renderers: ['prop-types', 'typescript'],
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('adds generics to flow schemas', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/flow/schema-generics.js`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      includeSchemas: true,
      schemaGenerics: true,
      renderers: ['flow'],
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });

  it('adds generics to typescript schemas', () => {
    const actualPath = `${TEST_ROOT}/schemas/types-schemas.json`;
    const expectedPath = `${TEST_ROOT}/expected/shapeshifter/typescript/schema-generics.ts`;

    const output = new Transpiler({
      ...otherOptions,
      includeDefinitions: true,
      includeSchemas: true,
      schemaGenerics: true,
      renderers: ['typescript'],
    }).transpileFile(actualPath);

    expect(output).toBe(file(expectedPath));
  });
});

describe('extractSchematics()', () => {
  it('handles reference paths correctly', () => {
    const schematics = new Transpiler(options).extractSchematics(
      `${TEST_ROOT}/schemas/json/reference.json`,
    );

    expect(schematics.map(schematic => schematic.path)).toEqual([
      `${TEST_ROOT}/schemas/json/reference-bar.json`,
      `${TEST_ROOT}/schemas/json/reference-set.json`,
      `${TEST_ROOT}/schemas/json/reference-foo.json`,
      `${TEST_ROOT}/schemas/json/reference.json`,
    ]);
  });
});
