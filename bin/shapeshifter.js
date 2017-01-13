#! /usr/bin/env node

/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

var path = require('path');
var CommandLine = require('command-line-args');
var Usage = require('command-line-usage');
var Transpiler = require('../lib/Transpiler').default;
var Shapeshifter = require('../package.json');

// Define options
var optionList = [
  {
    name: 'help',
    alias: 'h',
    description: 'Display this help menu.',
    type: Boolean,
    defaultValue: false,
  },
  {
    name: 'nullable',
    alias: 'n',
    description: 'Mark attributes as nullable by default. Default true.',
    type: Boolean,
    defaultValue: true,
  },
  {
    name: 'indent',
    description: 'The indentation characters to use. Default 2 space indent.',
    typeLabel: '[underline]{char}',
    type: String,
    defaultValue: '  ',
  },
  {
    name: 'format',
    description: 'The format to generate. Accepts react, flow, or typescript. Default react.',
    typeLabel: '[underline]{name}',
    type: String,
    defaultValue: 'react',
  },
  {
    name: 'schemas',
    description: 'Include schema class exports in the output. Default false.',
    type: Boolean,
    defaultValue: false,
  },
  {
    name: 'attributes',
    description: 'Include an attribute list in the schema class export. Default false.',
    type: Boolean,
    defaultValue: false,
  },
  {
    name: 'types',
    description: 'Include type definition exports in the output. Default false.',
    type: Boolean,
    defaultValue: false,
  },
  {
    name: 'path',
    type: String,
    defaultOption: true,
  },
];

// Define help menu
var help = [
  {
    header: 'Shapeshifter v' + Shapeshifter.version,
    content: Shapeshifter.description,
  },
  {
    header: 'Usage',
    content: '$ shapeshifter [options] [underline]{input} > [underline]{output}',
  },
  {
    header: 'Options',
    optionList: optionList,
    hide: 'path'
  }
];

// Parse options
var options = CommandLine(optionList);

// Show help menu
if (options.help || !options.path) {
  Transpiler.output(Usage(help));

// Run transpiler
} else {
  new Transpiler({
    defaultNullable: options.nullable,
    includeSchemas: options.schemas,
    includeAttributes: options.attributes,
    includeTypes: options.types,
    indentCharacter: options.indent,
    renderer: options.format,
  })
    .transpile(path.normalize(path.join(process.cwd(), options.path)))
    .then(Transpiler.output)
    .catch(Transpiler.error);
}
