import UnionNamespace, { UnionClassName } from '../stub';

export enum UnionStringEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum UnionNumberEnum {
  A = 789,
  B = 456,
  C = 123
}

export enum UnionUnionNumberEnum {
  A = 1,
  B = 2,
  C = 3
}

export interface UnionSchema {
  arrayField?: string[] | Array<{ [key: string]: string }>;
  primitiveFields?: boolean | number | () => void;
  enumField?: UnionStringEnum | UnionNumberEnum;
  instanceField?: UnionClassName | UnionNamespace.UnionClassName;
  objectField?: { [key: string]: number } | { [key: string]: string[] };
  shapeField?: {
    foo?: string;
    bar?: boolean;
    baz: () => void;
  } | {
    qux?: string | boolean;
  };
  unionField?: string | UnionUnionNumberEnum | boolean | number;
}
