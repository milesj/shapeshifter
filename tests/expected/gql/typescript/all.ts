export enum ArrayEnumFieldEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export enum EnumFirstFieldEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export enum EnumSecondFieldEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export enum EnumThirdFieldEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

export enum ShapeStringEnumEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
}

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

export interface ReferenceBarInterface {
  boolField: boolean;
}

export interface ReferenceFooInterface {
  numberField: number;
  refField: ReferenceBarInterface;
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

export interface CoreFooInterface {
  id: number | string;
  name: string;
  foo: string;
}

export interface CoreBarInterface {
  id: number | string;
  name: string;
  bar: number;
}

export interface CoreInterface {
  id: number | string;
  name: string;
  foo: CoreFooInterface;
  fooWithArg: CoreFooInterface;
  bar: CoreBarInterface;
  barWithArg: CoreBarInterface;
}

export interface EnumInterface {
  firstField: EnumFirstFieldEnum;
  secondField: EnumSecondFieldEnum;
  thirdField: EnumThirdFieldEnum;
}

export interface PrimitiveInterface {
  boolField: boolean;
  boolFieldExpanded: boolean;
  numberField: number;
  numberFieldExpanded: number;
  floatField: number;
  floatFieldExpanded: number;
  stringField: string;
  stringFieldExpanded: string;
}

export interface ReferenceInterface {
  stringField: string;
  refField: ReferenceFooInterface;
  referenceField: ReferenceFooInterface;
}

export interface ShapeBasicStructInterface {
  foo: string;
}

export interface ShapePrimitiveStructInterface {
  string: string;
  bool: boolean;
  number: number;
}

export interface ShapeArrayStructInterface {
  numberArray: number[];
  stringArray: string[];
  shapeArray: Array<ShapeBasicStructInterface>;
}

export interface ShapeEnumStructInterface {
  stringEnum: ShapeStringEnumEnum;
}

export interface ShapeUnionStructInterface {
  multiUnion: number | boolean | ShapeEnumStructInterface;
}

export interface ShapeInterface {
  structAlias: ShapeBasicStructInterface;
  primitiveFields: ShapePrimitiveStructInterface;
  arrayFields: ShapeArrayStructInterface;
  enumFields: ShapeEnumStructInterface;
  unionFields: ShapeUnionStructInterface;
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
