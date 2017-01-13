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
      nullable: false
    },
    booleanField: 'boolean',
    booleanFieldExpanded: {
      type: 'boolean',
      nullable: false
    },
    intField: 'int',
    intFieldExpanded: {
      type: 'int',
      nullable: false
    },
    integerField: 'integer',
    integerFieldExpanded: {
      type: 'integer',
      nullable: false
    },
    numField: 'num',
    numFieldExpanded: {
      type: 'num',
      nullable: false
    },
    numberField: 'number',
    numberFieldExpanded: {
      type: 'number',
      nullable: false
    },
    floatField: 'float',
    floatFieldExpanded: {
      type: 'float',
      nullable: false
    },
    strField: 'str',
    strFieldExpanded: {
      type: 'str',
      nullable: false
    },
    stringField: 'string',
    stringFieldExpanded: {
      type: 'string',
      nullable: false
    }
  }
};
