#! /usr/bin/env node

/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

var path = require('path');
var CommandLine = require('command-line-args');
var Usage = require('command-line-usage');
var Transpiler = require('../lib/Transpiler').default;
var config = require('../lib/config').default;
var package = require('../package.json');

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
    description: 'Mark attributes as nullable by default (flow).',
    type: Boolean,
    defaultValue: config.defaultNull,
  },
  {
    name: 'required',
    alias: 'r',
    description: 'Mark attributes as required by default (react, typescript).',
    type: Boolean,
    defaultValue: config.defaultRequired,
  },
  {
    name: 'indent',
    description: 'The indentation characters to use.',
    typeLabel: '[underline]{char}',
    type: String,
    defaultValue: config.indentCharacter,
  },
  {
    name: 'format',
    description: 'The format to generate. Accepts react, flow, or typescript.',
    typeLabel: '[underline]{name}',
    type: String,
    defaultValue: config.renderer,
  },
  {
    name: 'entities',
    description: 'Include entity schemas in the output.',
    type: Boolean,
    defaultValue: config.includeEntities,
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
    header: 'Shapeshifter v' + package.version,
    content: package.description,
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
    defaultNull: options.nullable,
    defaultRequired: options.required,
    indentCharacter: options.indent,
    renderer: options.format,
    includeEntities: options.entities,
  })
    .transpile(path.normalize(path.join(process.cwd(), options.path)))
    .then(Transpiler.output)
    .catch(Transpiler.error);
}
