var CommandLine = require('command-line-args');
var Compiler = require('./lib/Compiler').default;

// Parse command line options
var options = CommandLine([
  { name: 'null', alias: 'n', type: Boolean, defaultValue: true },
  { name: 'required', alias: 'r', type: Boolean, defaultValue: false },
  { name: 'indent', type: String, defaultValue: '  ' },
  { name: 'renderer', type: String, defaultValue: 'react' },
  { name: 'suffix', type: String, defaultValue: 'Schema' },
  { name: 'paths', type: String, multiple: true, defaultOption: true },
]).parse();

// Instantiate and run compiler
var app = new Compiler(options);

options.paths.forEach(path => {
  app.compile(path).then(output => console.log(output));
});
