module.exports = {
  name: 'Sets',
  subsets: {
    Basic: ['foo', 'baz'],
    WithNull: {
      attributes: ['foo', 'qux'],
      nullable: {
        foo: false,
        qux: true,
      },
    },
  },
  attributes: {
    foo: 'string',
    bar: 'number',
    baz: {
      type: 'boolean',
      nullable: true,
    },
    qux: {
      type: 'string',
      nullable: true,
    },
  },
};
