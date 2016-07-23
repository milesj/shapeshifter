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

export interface ConstantsSchema {
  numberField?: number;
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

export interface ImportsSchema {
  stringField?: string;
}

export interface InstanceSchema {
  instField?: InstanceClassName;
  instanceField?: InstanceDefault;
}

export interface ObjectSchema {
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

export interface PrimitiveSchema {
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

export interface ReferenceBarSchema {
  boolField?: boolean;
}

export interface ReferenceFooSchema {
  numberField?: number;
  refField: ReferenceBarSchema;
}

export interface ReferenceSetSchema {
  boolField?: boolean;
  stringField?: string;
  numberField?: number;
}

export interface ReferenceSetOnlyStringSchema {
  stringField?: string;
}

export interface ReferenceSchema {
  stringField?: string;
  refField?: ReferenceFooSchema;
  referenceField?: ReferenceFooSchema;
  subsetRefField?: ReferenceSetOnlyStringSchema;
}

export interface SetsSchema {
  foo?: string;
  bar?: number;
  baz: boolean;
  qux?: () => void;
}

export interface SetsBasicSchema {
  foo?: string;
  baz: boolean;
}

export interface SetsWithRequiredSchema {
  bar: number;
  baz?: boolean;
  qux?: () => void;
}

export interface SetsWithNullSchema {
  foo?: string;
  qux?: () => void;
}

export interface SetsWithBothSchema {
  baz: boolean;
  qux: () => void;
}

export interface ShapeSchema {
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

export interface UnionSchema {
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
