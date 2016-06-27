export enum BoolEnum {
  A = 1,
  B = 0
}

export enum BooleanEnum {
  A = 0,
  B = 1
}

export enum IntEnum {
  A = 123
}

export enum IntegerEnum {
  A = 1,
  B = 2,
  C = 3
}

export enum NumEnum {
  A = 123,
  B = 456,
  C = 789
}

export enum NumberEnum {
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

export enum FloatEnum {
  A = 12.34,
  B = 56.78,
  C = 9,
  D = 65.4
}

export enum StrEnum {
  foo = 0,
  bar = 1
}

export enum StringEnum {
  baz = 0,
  qux = 1
}

export interface EnumSchema {
  boolField?: BoolEnum;
  booleanField?: BooleanEnum;
  intField?: IntEnum;
  integerField?: IntegerEnum;
  numField?: NumEnum;
  numberField?: NumberEnum;
  floatField?: FloatEnum;
  strField?: StrEnum;
  stringField?: StringEnum;
}
