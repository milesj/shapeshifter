// @flow

export type SetsBasicShape = {
  foo: string,
  baz: boolean,
};

export type SetsWithRequiredShape = {
  bar: number,
  baz: boolean,
  qux: () => void,
};

export type SetsWithNullShape = {
  foo: ?string,
  qux: ?() => void,
};

export type SetsWithBothShape = {
  baz: boolean,
  qux: ?() => void,
};

export type SetsShape = {
  foo: string,
  bar: number,
  baz: boolean,
  qux: () => void,
};
