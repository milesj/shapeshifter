module.exports = {
  name: 'Reference',
  references: {
    foo: './reference-foo.js',
    set: './reference-set.js'
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
    },
    subsetRefField: {
      type: 'reference',
      reference: 'set',
      subset: 'OnlyString'
    }
  }
};
