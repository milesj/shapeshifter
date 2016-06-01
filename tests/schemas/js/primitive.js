module.exports = {
  name: 'Primitive',
  constants: {
    PRIMITIVE_VALUES: ['string', 123, true],
    PRIMITIVE_STR: 'primitive'
  },
  attributes: {
    boolField: 'bool',
    boolFieldExpanded: {
      type: 'bool',
      required: true
    },
    booleanField: 'boolean',
    booleanFieldExpanded: {
      type: 'boolean',
      null: false
    },
    funcField: 'func',
    funcFieldExpanded: {
      type: 'func',
      required: true
    },
    functionField: 'function',
    functionFieldExpanded: {
      type: 'function',
      null: true
    },
    intField: 'int',
    intFieldExpanded: {
      type: 'int'
    },
    integerField: 'integer',
    integerFieldExpanded: {
      type: 'integer',
      required: true
    },
    numField: 'num',
    numFieldExpanded: {
      type: 'num',
      null: true
    },
    numberField: 'number',
    numberFieldExpanded: {
      type: 'number',
      null: false,
      required: true
    },
    floatField: 'float',
    floatFieldExpanded: {
      type: 'float',
      required: true
    },
    strField: 'str',
    strFieldExpanded: {
      type: 'str',
      null: false
    },
    stringField: 'string',
    stringFieldExpanded: {
      type: 'string'
    }
  }
};
