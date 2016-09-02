// @flow

export type SetsBasicType = {
  foo: string,
  baz: boolean,
};

export type SetsWithRequiredType = {
  bar: number,
  baz: boolean,
  qux: () => void,
};

export type SetsWithNullType = {
  foo: ?string,
  qux: ?() => void,
};

export type SetsWithBothType = {
  baz: boolean,
  qux: ?() => void,
};

export type SetsType = {
  foo: string,
  bar: number,
  baz: boolean,
  qux: () => void,
};
