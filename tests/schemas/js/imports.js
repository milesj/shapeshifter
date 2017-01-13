module.exports = {
  name: 'Imports',
  imports: [
    { default: 'DefaultName', path: '../stub' },
    { default: 'AnotherDefault', named: ['Baz', 'Qux'], path: '../stub' }
  ],
  attributes: {
    stringField: 'string'
  }
};
