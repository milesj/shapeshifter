// @flow
import UnionDefault, { UnionClassName } from '../stub';

export type UnionType = {
  arrayField: string[] | Array<{ [key: string]: string }>,
  primitiveFields: boolean | number | () => void,
  enumField: 'foo' | 'bar' | 'baz' | 789 | 456 | 123,
  instanceField: UnionClassName | UnionDefault,
  objectField: { [key: string]: number } | { [key: string]: string[] },
  shapeField: {
    foo: string,
    bar: boolean,
    baz: () => void,
  } | {
    qux: string | boolean,
  },
  unionField: string | 1 | 2 | 3 | boolean | number,
};
