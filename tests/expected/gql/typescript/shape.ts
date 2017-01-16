export enum ShapeStringEnumEnum {
  A = 0,
  B = 1,
  C = 2,
  D = 3
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
