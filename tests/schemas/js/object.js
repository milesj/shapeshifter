module.exports = {
  name: 'Object',
  imports: [
    { default: 'ObjectDefault', path: '../stub' }
  ],
  attributes: {
    arrayField: {
      type: 'object',
      valueType: {
        type: 'array',
        valueType: 'string'
      }
    },
    boolField: {
      type: 'object',
      valueType: 'bool',
      required: true
    },
    enumField: {
      type: 'object',
      valueType: {
        type: 'enum',
        valueType: 'string',
        values: ['foo', 'bar', 'baz']
      },
      null: false
    },
    instanceField: {
      type: 'object',
      valueType: {
        type: 'instance',
        contract: 'ObjectDefault'
      }
    },
    numberField: {
      type: 'object',
      valueType: 'number'
    },
    objectField: {
      type: 'object',
      valueType: {
        type: 'object',
        valueType: 'number'
      }
    },
    shapeField: {
      type: 'object',
      valueType: {
        type: 'shape',
        attributes: {
          foo: 'string',
          bar: 'bool'
        }
      }
    },
    stringField: {
      type: 'object',
      valueType: 'string'
    },
    unionField: {
      type: 'object',
      valueType: {
        type: 'union',
        valueTypes: [
          {
            type: 'int'
          },
          {
            type: 'array',
            valueType: 'string'
          }
        ]
      }
    },
    objShorthandField: {
      type: 'obj',
      valueType: 'string'
    },
    objKeyTypeField: {
      type: 'object',
      keyType: 'number',
      valueType: 'string'
    }
  }
};
