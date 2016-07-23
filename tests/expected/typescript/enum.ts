export enum EnumBoolFieldEnum {
  A = 1,
  B = 0
}

export enum EnumBooleanFieldEnum {
  A = 0,
  B = 1
}

export enum EnumIntFieldEnum {
  A = 123
}

export enum EnumIntegerFieldEnum {
  A = 1,
  B = 2,
  C = 3
}

export enum EnumNumFieldEnum {
  A = 123,
  B = 456,
  C = 789
}

export enum EnumNumberFieldEnum {
  A = 1,
  B = 2,
  C = 3,
  D = 4,
  E = 5,
  F = 6,
  G = 7,
  H = 8,
  I = 9,
  J = 10
}

export enum EnumFloatFieldEnum {
  A = 12.34,
  B = 56.78,
  C = 9,
  D = 65.4
}

export enum EnumStrFieldEnum {
  foo = 0,
  bar = 1
}

export enum EnumStringFieldEnum {
  baz = 0,
  qux = 1
}

export interface EnumSchema {
  boolField?: EnumBoolFieldEnum;
  booleanField?: EnumBooleanFieldEnum;
  intField?: EnumIntFieldEnum;
  integerField?: EnumIntegerFieldEnum;
  numField?: EnumNumFieldEnum;
  numberField?: EnumNumberFieldEnum;
  floatField?: EnumFloatFieldEnum;
  strField?: EnumStrFieldEnum;
  stringField?: EnumStringFieldEnum;
}
