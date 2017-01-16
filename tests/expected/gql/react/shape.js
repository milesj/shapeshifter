import { PropTypes } from 'react';

export const ShapeBasicStructShape = PropTypes.shape({
  foo: PropTypes.string,
});

export const ShapePrimitiveStructShape = PropTypes.shape({
  string: PropTypes.string,
  bool: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
});

export const ShapeArrayStructShape = PropTypes.shape({
  numberArray: PropTypes.arrayOf(PropTypes.number),
  stringArray: PropTypes.arrayOf(PropTypes.string),
  shapeArray: PropTypes.arrayOf(ShapeBasicStructShape),
});

export const ShapeEnumStructShape = PropTypes.shape({
  stringEnum: PropTypes.oneOf([
    0,
    1,
    2,
    3,
  ]),
});

export const ShapeUnionStructShape = PropTypes.shape({
  multiUnion: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    ShapeEnumStructShape,
  ]),
});

export const ShapeShape = PropTypes.shape({
  structAlias: ShapeBasicStructShape,
  primitiveFields: ShapePrimitiveStructShape,
  arrayFields: ShapeArrayStructShape,
  enumFields: ShapeEnumStructShape,
  unionFields: ShapeUnionStructShape,
});
