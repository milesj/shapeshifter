// @flow
import UnionNamespace, { UnionClassName } from '../stub';

export type UnionSchema = {
  arrayField: string[] | Array<{ [key: string]: string }>,
  primitiveFields: boolean | number | () => void,
  enumField: 'foo' | 'bar' | 'baz' | 789 | 456 | 123,
  instanceField: UnionClassName | UnionNamespace.UnionClassName,
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
