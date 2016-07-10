import { PropTypes } from 'react';
import ArrayDefault from '../stub';
import DefaultName from '../stub';
import { foo, bar } from '../stub';
import AnotherDefault, { Baz, Qux } from '../stub';
import InstanceDefault, { InstanceClassName } from '../stub';
import ObjectDefault from '../stub';
import ShapeDefault, { ShapeClassName } from '../stub';
import UnionDefault, { UnionClassName } from '../stub';

export const ARRAY_NUM = 123;
export const CONST_STRING = 'string';
export const STATUS_NUMBER = 123;
export const MAGIC_FLOAT = 456.78;
export const IS_ENABLED = true;
export const EMPTY_VALUE = null;
export const PRIMITIVE_LIST = ['foo', 123, 456.78, false];
export const INST_STR = 'foobar';
export const INST_ENABLED = true;
export const PRIMITIVE_VALUES = ['string', 123, true];
export const PRIMITIVE_STR = 'primitive';

export const ArraySchema = PropTypes.shape({
  arrayField: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  boolField: PropTypes.arrayOf(PropTypes.bool),
  enumField: PropTypes.arrayOf(PropTypes.oneOf([
    'foo',
    'bar',
    'baz',
  ])),
  funcField: PropTypes.arrayOf(PropTypes.func),
  instanceField: PropTypes.arrayOf(PropTypes.instanceOf(ArrayDefault)),
  numberField: PropTypes.arrayOf(PropTypes.number).isRequired,
  objectField: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)),
  shapeField: PropTypes.arrayOf(PropTypes.shape({
    foo: PropTypes.string,
    bar: PropTypes.bool,
    baz: PropTypes.func.isRequired,
  })),
  stringField: PropTypes.arrayOf(PropTypes.string),
  unionField: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      1,
      2,
      3,
    ]),
  ])),
});

export const ConstantsSchema = PropTypes.shape({
  numberField: PropTypes.number,
});

export const EnumSchema = PropTypes.shape({
  boolField: PropTypes.oneOf([
    true,
    false,
  ]),
  booleanField: PropTypes.oneOf([
    false,
    true,
  ]),
  intField: PropTypes.oneOf([
    123,
  ]),
  integerField: PropTypes.oneOf([
    1,
    2,
    3,
  ]),
  numField: PropTypes.oneOf([
    123,
    456,
    789,
  ]),
  numberField: PropTypes.oneOf([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]),
  floatField: PropTypes.oneOf([
    12.34,
    56.78,
    9,
    65.4,
  ]),
  strField: PropTypes.oneOf([
    'foo',
    'bar',
  ]),
  stringField: PropTypes.oneOf([
    'baz',
    'qux',
  ]),
});

export const ImportsSchema = PropTypes.shape({
  stringField: PropTypes.string,
});

export const InstanceSchema = PropTypes.shape({
  instField: PropTypes.instanceOf(InstanceClassName),
  instanceField: PropTypes.instanceOf(InstanceDefault),
});

export const ObjectSchema = PropTypes.shape({
  arrayField: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  boolField: PropTypes.objectOf(PropTypes.bool).isRequired,
  enumField: PropTypes.objectOf(PropTypes.oneOf([
    'foo',
    'bar',
    'baz',
  ])),
  funcField: PropTypes.objectOf(PropTypes.func),
  instanceField: PropTypes.objectOf(PropTypes.instanceOf(ObjectDefault)),
  numberField: PropTypes.objectOf(PropTypes.number),
  objectField: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
  shapeField: PropTypes.objectOf(PropTypes.shape({
    foo: PropTypes.string,
    bar: PropTypes.bool,
    baz: PropTypes.func.isRequired,
  })),
  stringField: PropTypes.objectOf(PropTypes.string),
  unionField: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
  ])),
  objShorthandField: PropTypes.objectOf(PropTypes.string),
  objKeyTypeField: PropTypes.objectOf(PropTypes.string),
});

export const PrimitiveSchema = PropTypes.shape({
  boolField: PropTypes.bool,
  boolFieldExpanded: PropTypes.bool.isRequired,
  booleanField: PropTypes.bool,
  booleanFieldExpanded: PropTypes.bool,
  funcField: PropTypes.func.isRequired,
  functionField: PropTypes.func,
  intField: PropTypes.number,
  intFieldExpanded: PropTypes.number,
  integerField: PropTypes.number,
  integerFieldExpanded: PropTypes.number.isRequired,
  numField: PropTypes.number,
  numFieldExpanded: PropTypes.number,
  numberField: PropTypes.number,
  numberFieldExpanded: PropTypes.number.isRequired,
  floatField: PropTypes.number,
  floatFieldExpanded: PropTypes.number.isRequired,
  strField: PropTypes.string,
  strFieldExpanded: PropTypes.string,
  stringField: PropTypes.string,
  stringFieldExpanded: PropTypes.string,
});

export const ReferenceBarSchema = PropTypes.shape({
  boolField: PropTypes.bool,
});

export const ReferenceFooSchema = PropTypes.shape({
  numberField: PropTypes.number,
  refField: ReferenceBarSchema.isRequired,
});

export const ReferenceSchema = PropTypes.shape({
  stringField: PropTypes.string,
  refField: ReferenceFooSchema,
  referenceField: ReferenceFooSchema,
});

export const SetsSchema = PropTypes.shape({
  foo: PropTypes.string,
  bar: PropTypes.number,
  baz: PropTypes.bool.isRequired,
  qux: PropTypes.func,
});

export const SetsBasicSchema = PropTypes.shape({
  foo: PropTypes.string,
  baz: PropTypes.bool.isRequired,
});

export const SetsWithRequiredSchema = PropTypes.shape({
  bar: PropTypes.number.isRequired,
  baz: PropTypes.bool,
  qux: PropTypes.func,
});

export const SetsWithNullSchema = PropTypes.shape({
  foo: PropTypes.string,
  qux: PropTypes.func,
});

export const SetsWithBothSchema = PropTypes.shape({
  baz: PropTypes.bool.isRequired,
  qux: PropTypes.func.isRequired,
});

export const ShapeSchema = PropTypes.shape({
  structAlias: PropTypes.shape({
    foo: PropTypes.string,
  }),
  primitiveFields: PropTypes.shape({
    string: PropTypes.string,
    bool: PropTypes.bool,
    func: PropTypes.func,
    number: PropTypes.number.isRequired,
  }),
  arrayFields: PropTypes.shape({
    numberArray: PropTypes.arrayOf(PropTypes.number),
    stringArray: PropTypes.arrayOf(PropTypes.string),
    shapeArray: PropTypes.arrayOf(PropTypes.shape({
      foo: PropTypes.string,
    })),
  }),
  enumFields: PropTypes.shape({
    stringEnum: PropTypes.oneOf([
      'foo',
      'bar',
      'baz',
    ]),
    intEnum: PropTypes.oneOf([
      1,
      2,
      3,
    ]),
  }),
  instanceFields: PropTypes.shape({
    instOf: PropTypes.instanceOf(ShapeClassName),
    instanceOf: PropTypes.instanceOf(ShapeDefault),
  }),
  objectFields: PropTypes.shape({
    numberObj: PropTypes.objectOf(PropTypes.number),
    boolObject: PropTypes.objectOf(PropTypes.bool),
    intStringObject: PropTypes.objectOf(PropTypes.string),
    unionObject: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        foo: PropTypes.string,
      }),
    ])),
  }),
  unionFields: PropTypes.shape({
    multiUnion: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
      PropTypes.instanceOf(ShapeClassName),
      PropTypes.objectOf(PropTypes.string),
      PropTypes.shape({
        string: PropTypes.string,
        enum: PropTypes.oneOf([
          123,
          456,
          789,
        ]),
      }),
    ]),
  }),
});

export const UnionSchema = PropTypes.shape({
  arrayField: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  ]),
  primitiveFields: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.func,
  ]),
  enumField: PropTypes.oneOfType([
    PropTypes.oneOf([
      'foo',
      'bar',
      'baz',
    ]),
    PropTypes.oneOf([
      789,
      456,
      123,
    ]),
  ]),
  instanceField: PropTypes.oneOfType([
    PropTypes.instanceOf(UnionClassName),
    PropTypes.instanceOf(UnionDefault),
  ]),
  objectField: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.number),
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  shapeField: PropTypes.oneOfType([
    PropTypes.shape({
      foo: PropTypes.string,
      bar: PropTypes.bool,
      baz: PropTypes.func.isRequired,
    }),
    PropTypes.shape({
      qux: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]),
    }),
  ]),
  unionField: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([
        1,
        2,
        3,
      ]),
    ]),
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
  ]),
});
