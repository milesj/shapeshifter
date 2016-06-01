module.exports = {
  name: 'Array',
  imports: [
    { default: 'UnionNamespace', named: ['UnionClassName'], path: '/path/to/UnionClassName' }
  ],
  attributes: {
    arrayField: {
      type: 'union',
      valueTypes: [
        {
          type: 'array',
          valueType: 'string'
        },
        {
          type: 'array',
          valueType: {
            type: 'object',
            valueType: 'string'
          }
        }
      ]
    },
    primitiveFields: {
      type: 'union',
      valueTypes: [
        'bool',
        'func',
        {
          type: 'integer'
        }
      ]
    },
    enumField: {
      type: 'union',
      valueTypes: [
        {
          type: 'enum',
          valueType: 'string',
          values: ['foo', 'bar', 'baz']
        },
        {
          type: 'enum',
          valueType: 'number',
          values: [789, 456, 123]
        }
      ]
    },
    instanceField: {
      type: 'union',
      valueTypes: [
        {
          type: 'instance',
          contract: 'UnionClassName'
        },
        {
          type: 'inst',
          contract: 'UnionNamespace.UnionClassName'
        }
      ]
    },
    objectField: {
      type: 'union',
      valueTypes: [
        {
          type: 'object',
          valueType: 'number'
        },
        {
          type: 'obj',
          valueType: {
            type: 'array',
            valueType: 'str'
          }
        }
      ]
    },
    shapeField: {
      type: 'union',
      valueTypes: [
        {
          type: 'shape',
          attributes: {
            foo: 'string',
            bar: 'bool',
            baz: {
              type: 'func',
              required: true
            }
          }
        },
        {
          type: 'struct',
          attributes: {
            qux: {
              type: 'union',
              valueTypes: ['string', 'bool']
            }
          }
        }
      ]
    },
    unionField: {
      type: 'union',
      valueTypes: [
        {
          type: 'union',
          valueTypes: [
            {
              type: 'string'
            },
            {
              type: 'enum',
              valueType: 'number',
              values: [1, 2, 3]
            }
          ]
        },
        {
          type: 'union',
          valueTypes: [
            'bool',
            'int'
          ]
        }
      ]
    }
  }
};
