#! /usr/bin/env node

/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable import/no-unresolved, no-invalid-this, prefer-arrow-callback */

const Vorpal = require('vorpal');
const Transpiler = require('../lib/Transpiler').default;

const shapeshifter = new Vorpal();

shapeshifter
  .command('build <paths...>', 'Transpile source files or folder.')
  .option('-n, --nullable', 'Mark attributes as nullable by default (recommended). Defaults to false.')
  .option('--indent <char>', 'The indentation characters to use. Defaults to 2 space indent.')
  .option('--import <name>', 'The import path to a Schema class. Defaults to "shapeshifter".')
  .option('--format <name>', 'The format to generate. Accepts react, flow, or typescript. Defaults to react.', ['react', 'flow', 'typescript'])
  .option('--schemas', 'Include schema class exports in the output. Defaults to false.')
  .option('--attributes', 'Include an attribute list in the schema class export. Defaults to false.')
  .option('--types', 'Include type definition exports in the output. Defaults to false.')
  .option('--useDefine', 'Reduce the output of schema ORM definitions. Defaults to false.')
  .option('--stripPropTypes', 'Strip PropTypes shapes in production. Defaults to false.')
  .action(function run({ options, paths }) {
    const action = this;

    return new Transpiler({
      defaultNullable: options.nullable || false,
      importPath: options.import || 'shapeshifter',
      includeSchemas: options.schemas || false,
      includeAttributes: options.attributes || false,
      includeTypes: options.types || false,
      indentCharacter: options.indent || '  ',
      renderer: options.format || 'react',
      stripPropTypes: options.stripPropTypes || false,
      useDefine: options.useDefine || false,
    })
      .transpile(paths)
      .then(function success(output) {
        // We need to log the output so that it can be piped
        action.log(output);

        return output;
      })
      .catch(function failure(error) {
        // Rudimentary error handling and styling
        action.log(shapeshifter.chalk.red(error.message));

        process.exit(1);
      });
  });

shapeshifter
  .delimiter(shapeshifter.chalk.magenta('shapeshifter$ '))
  .history('shapeshifter')
  .parse(process.argv);
