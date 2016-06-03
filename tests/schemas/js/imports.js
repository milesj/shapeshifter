module.exports = {
  name: 'Imports',
  imports: [
    { default: 'DefaultName', path: '/path/to/ImportClassName' },
    { named: ['foo', 'bar'], path: '/path/to/named/Imports' },
    { default: 'AnotherDefault', named: ['Baz', 'QUX'], path: '/path/to/named/and/Defaults' }
  ],
  attributes: {
    stringField: 'string'
  }
};
