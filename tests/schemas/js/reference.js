module.exports = {
  name: 'Reference',
  references: {
    foo: './reference-foo.js'
  },
  attributes: {
    stringField: 'string',
    refField: {
      type: 'ref',
      reference: 'foo'
    },
    referenceField: {
      type: 'reference',
      reference: 'foo'
    }
  }
};
