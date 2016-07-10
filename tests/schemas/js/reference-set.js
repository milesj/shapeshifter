module.exports = {
  name: 'ReferenceSet',
  subsets: {
    OnlyString: {
      attributes: ['stringField'],
      required: {
        string: true
      },
      null: {
        string: true
      }
    }
  },
  attributes: {
    boolField: 'bool',
    stringField: 'string',
    numberField: 'number'
  }
};
