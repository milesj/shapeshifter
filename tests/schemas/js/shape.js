module.exports = {
  name: 'Shape',
  imports: [
    { default: 'ShapeNamespace', named: ['ShapeClassName'], path: '../stub' }
  ],
  attributes: {
    structAlias: {
      type: 'struct',
      attributes: {
        foo: 'string'
      }
    },
    primitiveFields: {
      type: 'shape',
      attributes: {
        string: 'string',
        bool: {
          type: 'bool',
          null: false
        },
        func: {
          type: 'function',
          argTypes: ['bool']
        },
        number: {
          type: 'number',
          required: true
        }
      }
    },
    arrayFields: {
      type: 'shape',
      attributes: {
        numberArray: {
          type: 'array',
          valueType: 'number'
        },
        stringArray: {
          type: 'array',
          valueType: 'str'
        },
        shapeArray: {
          type: 'array',
          valueType: {
            type: 'struct',
            attributes: {
              foo: 'string'
            }
          }
        }
      }
    },
    enumFields: {
      type: 'shape',
      attributes: {
        stringEnum: {
          type: 'enum',
          name: 'ShapeStrEnum',
          valueType: 'str',
          values: ['foo', 'bar', 'baz']
        },
        intEnum: {
          type: 'enum',
          name: 'ShapeIntEnum',
          valueType: 'int',
          values: [1, 2, 3]
        }
      }
    },
    instanceFields: {
      type: 'shape',
      attributes: {
        instOf: {
          type: 'inst',
          contract: 'ShapeClassName'
        },
        instanceOf: {
          type: 'instance',
          contract: 'ShapeNamespace.ShapeClassName'
        }
      }
    },
    objectFields: {
      type: 'shape',
      attributes: {
        numberObj: {
          type: 'obj',
          valueType: 'number'
        },
        boolObject: {
          type: 'object',
          valueType: 'bool'
        },
        intStringObject: {
          type: 'object',
          valueType: 'string',
          keyType: 'int'
        },
        unionObject: {
          type: 'object',
          valueType: {
            type: 'union',
            valueTypes: [
              {
                type: 'number'
              },
              'string',
              {
                type: 'struct',
                attributes: {
                  foo: 'string'
                }
              }
            ]
          }
        }
      }
    },
    unionFields: {
      type: 'shape',
      attributes: {
        multiUnion: {
          type: 'union',
          valueTypes: [
            'number',
            'boolean',
            {
              type: 'instance',
              contract: 'ShapeClassName'
            },
            {
              type: 'object',
              valueType: 'string'
            },
            {
              type: 'shape',
              attributes: {
                string: 'string',
                enum: {
                  type: 'enum',
                  name: 'ShapeUnionNumberEnum',
                  valueType: 'number',
                  values: [123, 456, 789]
                }
              }
            }
          ]
        }
      }
    }
  }
};
