module.exports = {
  name: 'Enum',
  imports: [
    { default: 'EnumNamespace', named: ['fooFunc', 'barFunc'], path: '/path/to/EnumFuncs' }
  ],
  attributes: {
    boolField: {
      type: 'enum',
      valueType: 'bool',
      values: [true, false]
    },
    booleanField: {
      type: 'enum',
      valueType: 'boolean',
      values: [false, true]
    },
    funcField: {
      type: 'enum',
      valueType: 'func',
      values: ['fooFunc', 'barFunc']
    },
    functionField: {
      type: 'enum',
      valueType: 'function',
      values: ['EnumNamespace.fooFunc', 'EnumNamespace.barFunc']
    },
    intField: {
      type: 'enum',
      valueType: 'int',
      values: [123]
    },
    integerField: {
      type: 'enum',
      valueType: 'integer',
      values: [1, 2, 3]
    },
    numField: {
      type: 'enum',
      valueType: 'num',
      values: [123, 456, 789]
    },
    numberField: {
      type: 'enum',
      valueType: 'number',
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    floatField: {
      type: 'enum',
      valueType: 'float',
      values: [12.34, 56.78, 9.00, 65.4]
    },
    strField: {
      type: 'enum',
      valueType: 'str',
      values: ['foo', 'bar']
    },
    stringField: {
      type: 'enum',
      valueType: 'string',
      values: ['baz', 'qux']
    }
  }
};
