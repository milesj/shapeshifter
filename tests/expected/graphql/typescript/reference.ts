/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

export interface ReferenceBarInterface {
  boolField: boolean | null;
}

export interface ReferenceFooInterface {
  numberField: number | null;
  refField: ReferenceBarInterface;
}

export interface ReferenceInterface {
  stringField: string | null;
  refField: ReferenceFooInterface;
  referenceField: ReferenceFooInterface | null;
}