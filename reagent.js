var path = require('path');
var CommandLine = require('command-line-args');
var Compiler = require('./lib/Compiler').default;
var config = require('./lib/config').default;

// Parse command line options
var options = CommandLine([
  { name: 'null', alias: 'n', type: Boolean, defaultValue: config.defaultNull },
  { name: 'required', alias: 'r', type: Boolean, defaultValue: config.defaultRequired },
  { name: 'indent', type: String, defaultValue: config.indentCharacter },
  { name: 'renderer', type: String, defaultValue: config.renderer },
  { name: 'suffix', type: String, defaultValue: config.schemaSuffix },
  { name: 'path', type: String, defaultOption: true },
]).parse();

// Instantiate and run compiler
new Compiler({
  defaultNull: options.null,
  defaultRequired: options.required,
  indentCharacter: options.indent,
  renderer: options.renderer,
  schemaSuffix: options.suffix,
})
  .compile(path.normalize(path.join(__dirname, options.path)))
  .then(Compiler.output)
  .catch(Compiler.error);
