/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

import ObjectDefault from '../stub';

export enum ObjectEnumFieldValueEnum {
  foo,
  bar,
  baz
}

export interface ObjectInterface {
  arrayField: { [key: string]: Array<string | null> | null } | null;
  boolField: { [key: string]: boolean | null };
  enumField: { [key: string]: ObjectEnumFieldValueEnum | null };
  instanceField: { [key: string]: ObjectDefault | null } | null;
  numberField: { [key: string]: number | null } | null;
  objectField: { [key: string]: { [key: string]: number | null } | null } | null;
  shapeField: { [key: string]: {
    foo: string | null;
    bar: boolean | null;
  } | null } | null;
  stringField: { [key: string]: string | null } | null;
  unionField: { [key: string]: number | Array<string | null> | null } | null;
  objShorthandField: { [key: string]: string | null } | null;
  objKeyTypeField: { [key: number]: string | null } | null;
}