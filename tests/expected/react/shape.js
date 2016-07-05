import { PropTypes } from 'react';
import ShapeDefault, { ShapeClassName } from '../stub';

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
