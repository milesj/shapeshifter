import ShapeDefault, { ShapeClassName } from '../stub';

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
