// @flow

export type UnionFooStructType = {
  foo: ?string,
};

export type UnionBarStructType = {
  bar: ?boolean,
};

export type UnionBazStructType = {
  baz: ?boolean | ?number,
};

export type UnionType = {
  primitiveField: ?boolean | ?number,
  enumField: 'FOO' | 'BAR' | 'BAZ' | 'QUX',
  shapeField: ?UnionFooStructType | ?UnionBarStructType | ?UnionBazStructType,
  unionField: ?boolean | ?number | 'FOO' | 'BAR' | 'BAZ' | 'QUX' | ?UnionFooStructType | ?UnionBarStructType | ?UnionBazStructType,
};
