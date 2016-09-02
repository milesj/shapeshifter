import UnionDefault, { UnionClassName } from '../stub';

export enum UnionEnumField0Enum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum UnionEnumField1Enum {
  A = 789,
  B = 456,
  C = 123
}

export enum UnionUnionField01Enum {
  A = 1,
  B = 2,
  C = 3
}

export interface UnionInterface {
  arrayField?: string[] | Array<{ [key: string]: string }>;
  primitiveFields?: boolean | number | (() => void);
  enumField?: UnionEnumField0Enum | UnionEnumField1Enum;
  instanceField?: UnionClassName | UnionDefault;
  objectField?: { [key: string]: number } | { [key: string]: string[] };
  shapeField?: {
    foo?: string;
    bar?: boolean;
    baz: () => void;
  } | {
    qux?: string | boolean;
  };
  unionField?: string | UnionUnionField01Enum | boolean | number;
}
