module.exports = {
  name: 'Array',
  imports: [
    { default: 'ArrayDefault', path: '../stub' },
  ],
  constants: {
    ARRAY_NUM: 123,
  },
  attributes: {
    arrayField: {
      type: 'array',
      valueType: {
        type: 'array',
        valueType: 'string',
      },
    },
    boolField: {
      type: 'array',
      valueType: 'bool',
    },
    enumField: {
      type: 'array',
      valueType: {
        type: 'enum',
        valueType: 'string',
        values: ['foo', 'bar', 'baz'],
      },
    },
    instanceField: {
      type: 'array',
      valueType: {
        type: 'instance',
        contract: 'ArrayDefault',
      },
    },
    numberField: {
      type: 'array',
      valueType: 'number',
      nullable: false,
    },
    objectField: {
      type: 'array',
      valueType: {
        type: 'object',
        valueType: 'number',
      },
    },
    shapeField: {
      type: 'array',
      valueType: {
        type: 'shape',
        attributes: {
          foo: 'string',
          bar: 'bool',
        },
      },
    },
    stringField: {
      type: 'array',
      valueType: 'string',
    },
    unionField: {
      type: 'array',
      valueType: {
        type: 'union',
        valueTypes: [
          {
            type: 'string',
            nullable: false,
          },
          {
            type: 'enum',
            valueType: 'number',
            values: [1, 2, 3],
          },
        ],
      },
    },
  },
};
