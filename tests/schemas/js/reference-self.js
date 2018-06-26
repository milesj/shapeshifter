module.exports = {
  name: 'ReferenceSelf',
  subsets: {
    Basic: ['stringField'],
  },
  attributes: {
    stringField: 'string',
    referenceField: {
      type: 'reference',
      self: true,
    },
    requiredRefField: {
      type: 'ref',
      self: true,
      nullable: true,
    },
    subsetRefField: {
      type: 'array',
      valueType: {
        type: 'reference',
        self: true,
        subset: 'Basic',
      },
      optional: false,
    },
  },
};
