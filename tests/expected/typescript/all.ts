import ArrayClassName from '../stub';
import DefaultName from '../stub';
import { foo, bar } from '../stub';
import AnotherDefault, { Baz, QUX } from '../stub';
import InstNamespace, { InstanceClassName } from '../stub';
import ObjectClassName from '../stub';
import ShapeNamespace, { ShapeClassName } from '../stub';
import UnionNamespace, { UnionClassName } from '../stub';

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

export enum ArrayStringEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum ArrayUnionNumberEnum {
  A = 1,
  B = 2,
  C = 3
}

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

export enum ObjectStringEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum ShapeStrEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

export enum ShapeIntEnum {
  A = 1,
  B = 2,
  C = 3
}

export enum ShapeUnionNumberEnum {
  A = 123,
  B = 456,
  C = 789
}

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

export interface ArraySchema {
  arrayField?: Array<string[]>;
  boolField?: boolean[];
  enumField?: Array<ArrayStringEnum>;
  funcField?: Array<(arg0?: string, arg1?: number) => number>;
  instanceField?: ArrayClassName[];
  numberField: number[];
  objectField?: Array<{ [key: string]: number }>;
  shapeField?: Array<{
    foo?: string;
    bar?: boolean;
    baz: () => void;
  }>;
  stringField?: string[];
  unionField?: Array<string | ArrayUnionNumberEnum>;
}

export interface ConstantsSchema {
  numberField?: number;
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

export interface ImportsSchema {
  stringField?: string;
}

export interface InstanceSchema {
  instField?: InstanceClassName;
  instanceField?: InstNamespace.InstanceClassName;
}

export interface ObjectSchema {
  arrayField?: { [key: string]: string[] };
  boolField: { [key: string]: boolean };
  enumField?: { [key: string]: ObjectStringEnum };
  funcField?: { [key: string]: () => string };
  instanceField?: { [key: string]: ObjectClassName };
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
    stringEnum?: ShapeStrEnum;
    intEnum?: ShapeIntEnum;
  };
  instanceFields?: {
    instOf?: ShapeClassName;
    instanceOf?: ShapeNamespace.ShapeClassName;
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
      enum?: ShapeUnionNumberEnum;
    };
  };
}

export interface UnionSchema {
  arrayField?: string[] | Array<{ [key: string]: string }>;
  primitiveFields?: boolean | number | (() => void);
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
