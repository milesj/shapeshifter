
var Schema = require('./lib/Schema').default;
var ReactCompiler = require('./lib/compilers/React').default;
var FlowCompiler = require('./lib/compilers/Flow').default;

var s = new Schema(require('./tests/primitive-schema.json'));

console.log(s);

var rc = new ReactCompiler(s);

console.log(rc.compile());

// var fc = new FlowCompiler(s);

// console.log(fc.compile());
