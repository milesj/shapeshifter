import ArrayDefault from '../stub';
import DefaultName from '../stub';
import { foo, bar } from '../stub';
import AnotherDefault, { Baz, Qux } from '../stub';
import InstanceDefault, { InstanceClassName } from '../stub';
import ObjectDefault from '../stub';
import ShapeDefault, { ShapeClassName } from '../stub';
import UnionDefault, { UnionClassName } from '../stub';

export const ARRAY_NUM = 123;
export const CONST_STRING = 'string';
export const STATUS_NUMBER = 123;
export const MAGIC_FLOAT = 456.78;
export const IS_ENABLED = true;
export const EMPTY_VALUE = null;
export const PRIMITIVE_LIST = ['foo', 123, 456.78, false];
export const INST_STR = 'foobar';
export const INST_ENABLED = true;
export const PRIMITIVE_VALUES = ['string', 123, true];
export const PRIMITIVE_STR = 'primitive';

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

export enum ObjectEnumFieldValueEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum ShapeStringEnumEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum ShapeIntEnumEnum {
  A = 1,
  B = 2,
  C = 3
}

export enum ShapeEnumEnum {
  A = 123,
  B = 456,
  C = 789
}

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

export interface ArrayShape {
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

export interface ConstantsShape {
  numberField?: number;
}

export interface EnumShape {
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

export interface ImportsShape {
  stringField?: string;
}

export interface InstanceShape {
  instField?: InstanceClassName;
  instanceField?: InstanceDefault;
}

export interface ObjectShape {
  arrayField?: { [key: string]: string[] };
  boolField: { [key: string]: boolean };
  enumField?: { [key: string]: ObjectEnumFieldValueEnum };
  funcField?: { [key: string]: () => string };
  instanceField?: { [key: string]: ObjectDefault };
  numberField?: { [key: string]: number };
  objectField?: { [key: string]: { [key: string]: number } };
  shapeField?: { [key: string]: {
    foo?: string;
    bar?: boolean;
    baz: () => void;
  } };
  stringField?: { [key: string]: string };
  unionField?: { [key: string]: number | string[] };
  objShorthandField?: { [key: string]: string };
  objKeyTypeField?: { [key: number]: string };
}

export interface PrimitiveShape {
  boolField?: boolean;
  boolFieldExpanded: boolean;
  booleanField?: boolean;
  booleanFieldExpanded?: boolean;
  funcField: () => void;
  functionField?: (arg0?: string) => void;
  intField?: number;
  intFieldExpanded?: number;
  integerField?: number;
  integerFieldExpanded: number;
  numField?: number;
  numFieldExpanded?: number;
  numberField?: number;
  numberFieldExpanded: number;
  floatField?: number;
  floatFieldExpanded: number;
  strField?: string;
  strFieldExpanded?: string;
  stringField?: string;
  stringFieldExpanded?: string;
}

export interface ReferenceBarShape {
  boolField?: boolean;
}

export interface ReferenceFooShape {
  numberField?: number;
  refField: ReferenceBarShape;
}

export interface ReferenceSelfBasicShape {
  stringField?: string;
}

export interface ReferenceSelfShape {
  stringField?: string;
  referenceField?: ReferenceSelfShape;
  requiredRefField: ReferenceSelfShape;
  subsetRefField?: Array<ReferenceSelfBasicShape>;
}

export interface ReferenceSetOnlyStringShape {
  stringField?: string;
}

export interface ReferenceSetShape {
  boolField?: boolean;
  stringField?: string;
  numberField?: number;
}

export interface ReferenceShape {
  stringField?: string;
  refField?: ReferenceFooShape;
  referenceField?: ReferenceFooShape;
  subsetRefField?: ReferenceSetOnlyStringShape;
}

export interface SetsBasicShape {
  foo?: string;
  baz: boolean;
}

export interface SetsWithRequiredShape {
  bar: number;
  baz?: boolean;
  qux?: () => void;
}

export interface SetsWithNullShape {
  foo?: string;
  qux?: () => void;
}

export interface SetsWithBothShape {
  baz: boolean;
  qux: () => void;
}

export interface SetsShape {
  foo?: string;
  bar?: number;
  baz: boolean;
  qux?: () => void;
}

export interface ShapeShape {
  structAlias?: {
    foo?: string;
  };
  primitiveFields?: {
    string?: string;
    bool?: boolean;
    func?: (arg0?: boolean) => void;
    number: number;
  };
  arrayFields?: {
    numberArray?: number[];
    stringArray?: string[];
    shapeArray?: Array<{
      foo?: string;
    }>;
  };
  enumFields?: {
    stringEnum?: ShapeStringEnumEnum;
    intEnum?: ShapeIntEnumEnum;
  };
  instanceFields?: {
    instOf?: ShapeClassName;
    instanceOf?: ShapeDefault;
  };
  objectFields?: {
    numberObj?: { [key: string]: number };
    boolObject?: { [key: string]: boolean };
    intStringObject?: { [key: number]: string };
    unionObject?: { [key: string]: number | string | {
      foo?: string;
    } };
  };
  unionFields?: {
    multiUnion?: number | boolean | ShapeClassName | { [key: string]: string } | {
      string?: string;
      enum?: ShapeEnumEnum;
    };
  };
}

export interface UnionShape {
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
