export enum UnionEnumField0Enum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export enum UnionEnumField1Enum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export enum UnionUnionField10Enum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export enum UnionUnionField11Enum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export interface UnionFooStructInterface {
  foo: string;
}

export interface UnionBarStructInterface {
  bar: boolean;
}

export interface UnionBazStructInterface {
  baz: boolean | number;
}

export interface UnionInterface {
  primitiveField: boolean | number;
  enumField: UnionEnumField0Enum | UnionEnumField1Enum;
  shapeField: UnionFooStructInterface | UnionBarStructInterface | UnionBazStructInterface;
  unionField: boolean | number | UnionUnionField10Enum | UnionUnionField11Enum | UnionFooStructInterface | UnionBarStructInterface | UnionBazStructInterface;
}
