import { PropTypes } from 'react';

export const ArrayShapeObjectShape = PropTypes.shape({
  foo: PropTypes.string,
  bar: PropTypes.bool,
});

export const ArrayShape = PropTypes.shape({
  arrayField: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  boolField: PropTypes.arrayOf(PropTypes.bool),
  enumField: PropTypes.oneOf([
    0,
    1,
    2,
    3,
  ]),
  numberField: PropTypes.arrayOf(PropTypes.number).isRequired,
  shapeField: PropTypes.arrayOf(ArrayShapeObjectShape),
  stringField: PropTypes.arrayOf(PropTypes.string),
  unionField: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired),
});
