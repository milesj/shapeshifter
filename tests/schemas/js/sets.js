module.exports = {
  name: 'Sets',
  subsets: {
    Basic: ['foo', 'baz'],
    WithRequired: {
      attributes: ['bar', 'baz', 'qux'],
      required: {
        bar: true,
        baz: false
      }
    },
    WithNull: {
      attributes: ['foo', 'qux'],
      null: {
        foo: true,
        qux: true
      }
    },
    WithBoth: {
      attributes: ['baz', 'qux'],
      required: {
        qux: true
      },
      null: {
        qux: true
      }
    }
  },
  attributes: {
    foo: 'string',
    bar: 'number',
    baz: {
      type: 'boolean',
      required: true
    },
    qux: {
      type: 'string',
      null: false
    }
  }
};
