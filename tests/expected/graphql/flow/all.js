/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */
/* @flow */

export type Key = string | number;

export type ReferenceBarType = {
  boolField?: ?boolean,
};

export type ReferenceFooType = {
  numberField?: ?number,
  refField?: ReferenceBarType,
};

export type ArrayShapeObjectType = {
  foo?: ?string,
  bar?: ?boolean,
};

export type ArrayType = {
  arrayField?: ?Array<?Array<?string>>,
  boolField?: ?Array<?boolean>,
  enumField?: ?Array<'FOO' | 'BAR' | 'BAZ' | 'QUX'>,
  numberField?: Array<?number>,
  shapeField?: ?Array<?ArrayShapeObjectType>,
  stringField?: ?Array<?string>,
  unionField?: ?Array<string | number>,
};

export type CoreFooType = {
  id?: ?Key,
  name?: ?string,
  foo?: ?string,
};

export type CoreBarType = {
  id?: ?Key,
  name?: ?string,
  bar?: ?number,
};

export type CoreType = {
  id?: ?Key,
  name?: ?string,
  foo?: ?CoreFooType,
  fooWithArg?: CoreFooType,
  bar?: ?CoreBarType,
  barWithArg?: CoreBarType,
};

export type EnumType = {
  field?: 'FOO' | 'BAR' | 'BAZ' | 'QUX',
};

export type PrimitiveType = {
  boolField?: ?boolean,
  boolFieldExpanded?: boolean,
  numberField?: ?number,
  numberFieldExpanded?: number,
  floatField?: ?number,
  floatFieldExpanded?: number,
  stringField?: ?string,
  stringFieldExpanded?: string,
};

export type ReferenceSelfType = {
  stringField?: ?string,
  referenceField?: ?ReferenceSelfType,
  requiredRefField?: ReferenceSelfType,
};

export type ReferenceType = {
  stringField?: ?string,
  refField?: ReferenceFooType,
  referenceField?: ?ReferenceFooType,
};

export type ShapeBasicStructType = {
  foo?: ?string,
};

export type ShapePrimitiveStructType = {
  string?: ?string,
  bool?: boolean,
  number?: number,
};

export type ShapeArrayStructType = {
  numberArray?: ?Array<?number>,
  stringArray?: ?Array<?string>,
  shapeArray?: ?Array<?ShapeBasicStructType>,
};

export type ShapeEnumStructType = {
  stringEnum?: 'FOO' | 'BAR' | 'BAZ' | 'QUX',
};

export type ShapeUnionStructType = {
  multiUnion?: number | boolean | ShapeEnumStructType | null,
};

export type ShapeType = {
  structAlias?: ?ShapeBasicStructType,
  primitiveFields?: ?ShapePrimitiveStructType,
  arrayFields?: ?ShapeArrayStructType,
  enumFields?: ?ShapeEnumStructType,
  unionFields?: ?ShapeUnionStructType,
};

export type UnionFooStructType = {
  foo?: ?string,
};

export type UnionBarStructType = {
  bar?: ?boolean,
};

export type UnionBazStructType = {
  baz?: boolean | number | null,
};

export type UnionType = {
  primitiveField?: boolean | number | null,
  enumField?: 'FOO' | 'BAR' | 'BAZ' | 'QUX' | null,
  shapeField?: UnionFooStructType | UnionBarStructType | UnionBazStructType | null,
  unionField?: boolean | number | 'FOO' | 'BAR' | 'BAZ' | 'QUX' | UnionFooStructType | UnionBarStructType | UnionBazStructType | null,
};

export type UnsupportedNodesType = {
  name?: ?string,
};
