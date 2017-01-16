// @flow

export type ArrayShapeObjectType = {
  foo: ?string,
  bar: ?boolean,
};

export type ArrayType = {
  arrayField: ?Array<?Array<?string>>,
  boolField: ?Array<?boolean>,
  enumField: ?Array<0 | 1 | 2 | 3>,
  numberField: Array<?number>,
  shapeField: ?Array<?ArrayShapeObjectType>,
  stringField: ?Array<?string>,
  unionField: ?Array<?string | ?number>,
};
