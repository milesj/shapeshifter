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
  enumField: 0 | 1 | 2 | 3 | 0 | 1 | 2 | 3,
  shapeField: ?UnionFooStructType | ?UnionBarStructType | ?UnionBazStructType,
  unionField: ?boolean | ?number | 0 | 1 | 2 | 3 | 0 | 1 | 2 | 3 | ?UnionFooStructType | ?UnionBarStructType | ?UnionBazStructType,
};
