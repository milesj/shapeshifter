/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

import ObjectDefault from '../stub';

export enum ObjectEnumFieldValueEnum {
  foo,
  bar,
  baz
}

export interface ObjectInterface {
  arrayField?: { [key: string]: Array<string> };
  boolField?: { [key: string]: boolean } | null;
  enumField?: { [key: string]: ObjectEnumFieldValueEnum } | null;
  instanceField?: { [key: string]: ObjectDefault };
  numberField?: { [key: string]: number };
  objectField?: { [key: string]: { [key: string]: number } };
  shapeField?: { [key: string]: {
    foo?: string;
    bar?: boolean;
  } };
  stringField?: { [key: string]: string };
  unionField?: { [key: string]: number | Array<string> };
  objShorthandField?: { [key: string]: string };
  objKeyTypeField?: { [key: number]: string };
}
