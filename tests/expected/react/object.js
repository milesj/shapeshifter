import { PropTypes } from 'react';
import ObjectDefault from '../stub';

export const ObjectShape = PropTypes.shape({
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
