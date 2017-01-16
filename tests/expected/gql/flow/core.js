// @flow

export type CoreFooType = {
  id: ?number | ?string,
  name: ?string,
  foo: ?string,
};

export type CoreBarType = {
  id: ?number | ?string,
  name: ?string,
  bar: ?number,
};

export type CoreType = {
  id: ?number | ?string,
  name: ?string,
  foo: ?CoreFooType,
  fooWithArg: CoreFooType,
  bar: ?CoreBarType,
  barWithArg: CoreBarType,
};
