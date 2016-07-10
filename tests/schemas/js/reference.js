module.exports = {
  name: 'Reference',
  references: {
    foo: './reference-foo.js'
  },
  attributes: {
    stringField: 'string',
    refField: {
      type: 'ref',
      reference: 'foo',
      null: true
    },
    referenceField: {
      type: 'reference',
      reference: 'foo'
    }
  }
};
