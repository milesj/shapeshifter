#! /usr/bin/env node

/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable */

const app = require('yargs');
const Transpiler = require('../lib/Transpiler').default;

app
  .usage(
    '$0 <paths..>',
    'Transpile source files or folder.',
    {
      attributes: {
        boolean: true,
        default: false,
        description: 'Include an attribute list in the schema class export.',
      },
      definitions: {
        boolean: true,
        default: false,
        description: 'Include type annotations and definitions in the output.',
      },
      'disable-eslint': {
        boolean: true,
        default: false,
        description: 'Prepend an eslint-disable comment to the top of the output.',
      },
      enums: {
        boolean: true,
        default: true,
        description: 'Generate enums over unions when applicable. (TypeScript only)',
      },
      flow: {
        boolean: true,
        default: false,
        description: 'Generate Flow definitions.',
      },
      indent: {
        default: '  ',
        description: 'The indentation characters to use.',
        string: true,
      },
      'infer-prop-types-shape': {
        boolean: true,
        default: false,
        description:
          'When using prop-types and typescript together, match the interface name with the prop-types shape name for automatic inference. (TypeScript only)',
      },
      import: {
        default: 'shapeshifter',
        description: 'The default import path to a Schema class.',
        string: true,
      },
      nullable: {
        boolean: true,
        default: false,
        description: 'Mark attributes as nullable by default.',
      },
      optional: {
        boolean: true,
        default: false,
        description: 'Mark attributes as optional by default (recommended).',
      },
      'prop-types': {
        boolean: true,
        default: false,
        description: 'Generate PropTypes definitions.',
      },
      schemas: {
        boolean: true,
        default: false,
        description: 'Include schema class exports in the output.',
      },
      'schema-generics': {
        boolean: true,
        default: false,
        description: 'Explicity type generic callsites for schemas. (TypeScript and Flow only)',
      },
      'strip-prop-types': {
        boolean: true,
        default: false,
        description: 'Strip PropTypes shapes in production.',
      },
      typescript: {
        boolean: true,
        default: false,
        description: 'Generate TypeScript definitions.',
      },
      'use-define': {
        boolean: true,
        default: false,
        description: 'Reduce the output of schema ORM definitions.',
      },
    },
    function(options) {
      const renderers = [
        options.propTypes ? 'prop-types' : '', // Always first
        options.flow ? 'flow' : '',
        options.typescript ? 'typescript' : '',
      ];

      new Transpiler({
        defaultNullable: options.nullable,
        defaultOptional: options.optional,
        disableEslint: options.disableEslint,
        enums: options.enums,
        importPath: options.import,
        includeAttributes: options.attributes,
        includeDefinitions: options.definitions,
        includeSchemas: options.schemas,
        indentCharacter: options.indent,
        inferPropTypesShape: options.inferPropTypesShape,
        renderers: renderers.filter(Boolean),
        schemaGenerics: options.schemaGenerics,
        stripPropTypes: options.stripPropTypes,
        useDefine: options.useDefine,
      })
        .transpile(options.paths)
        .then(function(output) {
          console.log(output);
        })
        .catch(function(error) {
          console.error(error.message);
          process.exitCode = 1;
        });
    },
  )
  .help().argv;
