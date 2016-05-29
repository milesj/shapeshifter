var path = require('path');
var CommandLine = require('command-line-args');
var Compiler = require('./lib/Compiler').default;

// Parse command line options
var options = CommandLine([
  { name: 'null', alias: 'n', type: Boolean, defaultValue: true },
  { name: 'required', alias: 'r', type: Boolean, defaultValue: false },
  { name: 'indent', type: String, defaultValue: '  ' },
  { name: 'renderer', type: String, defaultValue: 'react' },
  { name: 'suffix', type: String, defaultValue: 'Schema' },
  { name: 'path', type: String, defaultOption: true },
]).parse();

// Instantiate and run compiler
new Compiler(options)
  .compile(path.normalize(path.join(__dirname, options.path)))
  .then(Compiler.output)
  .catch(Compiler.error);
