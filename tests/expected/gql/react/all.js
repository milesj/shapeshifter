import PropTypes from 'prop-types';

export const ReferenceBarShape = PropTypes.shape({
  boolField: PropTypes.bool,
});

export const ReferenceFooShape = PropTypes.shape({
  numberField: PropTypes.number,
  refField: ReferenceBarShape.isRequired,
});

export const ArrayShapeObjectShape = PropTypes.shape({
  foo: PropTypes.string,
  bar: PropTypes.bool,
});

export const ArrayShape = PropTypes.shape({
  arrayField: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  boolField: PropTypes.arrayOf(PropTypes.bool),
  enumField: PropTypes.arrayOf(PropTypes.oneOf([
    'FOO',
    'BAR',
    'BAZ',
    'QUX',
  ])),
  numberField: PropTypes.arrayOf(PropTypes.number).isRequired,
  shapeField: PropTypes.arrayOf(ArrayShapeObjectShape),
  stringField: PropTypes.arrayOf(PropTypes.string),
  unionField: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired),
});

export const CoreFooShape = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  foo: PropTypes.string,
});

export const CoreBarShape = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  bar: PropTypes.number,
});

export const CoreShape = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  foo: CoreFooShape,
  fooWithArg: CoreFooShape.isRequired,
  bar: CoreBarShape,
  barWithArg: CoreBarShape.isRequired,
});

export const EnumShape = PropTypes.shape({
  field: PropTypes.oneOf([
    'FOO',
    'BAR',
    'BAZ',
    'QUX',
  ]),
});

export const PrimitiveShape = PropTypes.shape({
  boolField: PropTypes.bool,
  boolFieldExpanded: PropTypes.bool.isRequired,
  numberField: PropTypes.number,
  numberFieldExpanded: PropTypes.number.isRequired,
  floatField: PropTypes.number,
  floatFieldExpanded: PropTypes.number.isRequired,
  stringField: PropTypes.string,
  stringFieldExpanded: PropTypes.string.isRequired,
});

export const ReferenceSelfShape = PropTypes.shape({
  stringField: PropTypes.string,
  referenceField: (...args) => ReferenceSelfShape(...args),
  requiredRefField: (...args) => ReferenceSelfShape(...args).isRequired,
});

export const ReferenceShape = PropTypes.shape({
  stringField: PropTypes.string,
  refField: ReferenceFooShape.isRequired,
  referenceField: ReferenceFooShape,
});

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
    'FOO',
    'BAR',
    'BAZ',
    'QUX',
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

export const UnionFooStructShape = PropTypes.shape({
  foo: PropTypes.string,
});

export const UnionBarStructShape = PropTypes.shape({
  bar: PropTypes.bool,
});

export const UnionBazStructShape = PropTypes.shape({
  baz: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
});

export const UnionShape = PropTypes.shape({
  primitiveField: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  enumField: PropTypes.oneOfType([
    PropTypes.oneOf([
      'FOO',
      'BAR',
    ]),
    PropTypes.oneOf([
      'BAZ',
      'QUX',
    ]),
  ]),
  shapeField: PropTypes.oneOfType([
    UnionFooStructShape,
    UnionBarStructShape,
    UnionBazStructShape,
  ]),
  unionField: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
    PropTypes.oneOfType([
      PropTypes.oneOf([
        'FOO',
        'BAR',
      ]),
      PropTypes.oneOf([
        'BAZ',
        'QUX',
      ]),
    ]),
    PropTypes.oneOfType([
      UnionFooStructShape,
      UnionBarStructShape,
      UnionBazStructShape,
    ]),
  ]),
});
