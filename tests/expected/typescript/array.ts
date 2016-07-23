import ArrayDefault from '../stub';

export const ARRAY_NUM = 123;

export enum ArrayEnumFieldEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum ArrayUnionField1Enum {
  A = 1,
  B = 2,
  C = 3
}

export interface ArraySchema {
  arrayField?: Array<string[]>;
  boolField?: boolean[];
  enumField?: Array<ArrayEnumFieldEnum>;
  funcField?: Array<(arg0?: string, arg1?: number) => number>;
  instanceField?: ArrayDefault[];
  numberField: number[];
  objectField?: Array<{ [key: string]: number }>;
  shapeField?: Array<{
    foo?: string;
    bar?: boolean;
    baz: () => void;
  }>;
  stringField?: string[];
  unionField?: Array<string | ArrayUnionField1Enum>;
}
