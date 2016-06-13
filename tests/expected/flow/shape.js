// @flow
import ShapeNamespace, { ShapeClassName } from '/path/to/ShapeClassName';

export type ShapeSchema = {
  structAlias: {
    foo: string,
  },
  primitiveFields: {
    string: string,
    bool: boolean,
    func: (arg0: boolean) => void,
    number: number,
  },
  arrayFields: {
    numberArray: number[],
    stringArray: string[],
    shapeArray: Array<{
      foo: string,
    }>,
  },
  enumFields: {
    stringEnum: 'foo' | 'bar' | 'baz',
    intEnum: 1 | 2 | 3,
  },
  instanceFields: {
    instOf: ShapeClassName,
    instanceOf: ShapeNamespace.ShapeClassName,
  },
  objectFields: {
    numberObj: {
      [key: string]: number,
    },
    boolObject: {
      [key: string]: boolean,
    },
    intStringObject: {
      [key: number]: string,
    },
    unionObject: {
      [key: string]: ,
    },
  },
  unionFields: {
    multiUnion: ,
  },
};
