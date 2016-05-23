
var Parser = require('./lib/Parser').default;

var p = new Parser(require('./tests/primitive-schema.json'));

console.log(p.parse());
