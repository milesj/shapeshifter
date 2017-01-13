module.exports = {
  name: 'ReferenceSet',
  subsets: {
    OnlyString: {
      attributes: ['stringField'],
      nullable: {
        stringField: false
      }
    }
  },
  attributes: {
    boolField: 'bool',
    stringField: 'string',
    numberField: 'number'
  }
};
