export enum ArrayEnumFieldEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export interface ArrayShapeObjectInterface {
  foo: string;
  bar: boolean;
}

export interface ArrayInterface {
  arrayField: Array<string[]>;
  boolField: boolean[];
  enumField: Array<ArrayEnumFieldEnum>;
  numberField: number[];
  shapeField: Array<ArrayShapeObjectInterface>;
  stringField: string[];
  unionField: Array<string | number>;
}
