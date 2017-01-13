// @flow

export type SetsBasicType = {
  foo: string,
  baz: boolean,
};

export type SetsWithRequiredType = {
  bar: number,
  baz: boolean,
  qux: string,
};

export type SetsWithNullType = {
  foo: ?string,
  qux: ?string,
};

export type SetsWithBothType = {
  baz: boolean,
  qux: ?string,
};

export type SetsType = {
  foo: string,
  bar: number,
  baz: boolean,
  qux: string,
};
