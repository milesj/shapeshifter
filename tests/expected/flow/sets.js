// @flow

export type SetsSchema = {
  foo: string,
  bar: number,
  baz: boolean,
  qux: () => void,
};

export type SetsBasicSchema = {
  foo: string,
  baz: boolean,
};

export type SetsWithRequiredSchema = {
  bar: number,
  baz: boolean,
  qux: () => void,
};

export type SetsWithNullSchema = {
  foo: ?string,
  qux: ?() => void,
};

export type SetsWithBothSchema = {
  baz: boolean,
  qux: () => void,
};
