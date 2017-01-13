// @flow
import ArrayDefault from '../stub';

export const ARRAY_NUM = 123;

export type ArrayType = {
  arrayField: Array<string[]>,
  boolField: boolean[],
  enumField: Array<'foo' | 'bar' | 'baz'>,
  instanceField: ArrayDefault[],
  numberField: number[],
  objectField: Array<{ [key: string]: number }>,
  shapeField: Array<{
    foo: string,
    bar: boolean,
  }>,
  stringField: string[],
  unionField: Array<string | 1 | 2 | 3>,
};
