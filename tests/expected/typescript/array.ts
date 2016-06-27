import ArrayClassName from '../stub';

export const ARRAY_NUM = 123;

export enum ArrayStringEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum ArrayUnionNumberEnum {
  A = 1,
  B = 2,
  C = 3
}

export interface ArraySchema {
  arrayField?: Array<string[]>;
  boolField?: boolean[];
  enumField?: Array<ArrayStringEnum>;
  funcField?: Array<(arg0?: string; arg1?: number) => number>;
  instanceField?: ArrayClassName[];
  numberField: number[];
  objectField?: Array<{ [key: string]: number }>;
  shapeField?: Array<{
    foo?: string;
    bar?: boolean;
    baz: () => void;
  }>;
  stringField?: string[];
  unionField?: Array<string | ArrayUnionNumberEnum>;
}
