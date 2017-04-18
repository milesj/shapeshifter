#! /usr/bin/env node

/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

var path = require('path');
var Vorpal = require('vorpal');
var Transpiler = require('../lib/Transpiler').default;

var shapeshifter = new Vorpal();

shapeshifter
  .command('build <paths...>', 'Transpile source files or folder.')
  .option('-n, --nullable', 'Mark attributes as nullable by default (recommended). Defaults to false.')
  .option('--indent <char>', 'The indentation characters to use. Defaults to 2 space indent.')
  .option('--format <name>', 'The format to generate. Accepts react, flow, or typescript. Defaults to react.', ['react', 'flow', 'typescript'])
  .option('--schemas', 'Include schema class exports in the output. Defaults to false.')
  .option('--attributes', 'Include an attribute list in the schema class export. Defaults to false.')
  .option('--types', 'Include type definition exports in the output. Defaults to false.')
  .option('--useDefine', 'Reduce the output of schema ORM definitions. Defaults to false.')
  .option('--stripPropTypes', 'Strip PropTypes shapes in production. Defaults to false.')
  .action(function({ options, paths }) {
    return new Transpiler({
      defaultNullable: options.nullable || false,
      includeSchemas: options.schemas || false,
      includeAttributes: options.attributes || false,
      includeTypes: options.types || false,
      indentCharacter: options.indent || '  ',
      renderer: options.format || 'react',
      stripPropTypes: options.stripPropTypes || false,
      useDefine: options.useDefine || false,
    })
      .transpile(paths)
      .then((output) => {
        // We need to log the output so that it can be piped
        this.log(output);

        return output;
      })
      .catch((error) => {
        // Rudimentary error handling and styling
        this.log(shapeshifter.chalk.red(error.message));
      });
  });

shapeshifter
  .delimiter(shapeshifter.chalk.magenta('shapeshifter$ '))
  .history('shapeshifter')
  .parse(process.argv);
