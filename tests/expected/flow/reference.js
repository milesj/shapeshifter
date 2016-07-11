// @flow

export type ReferenceBarSchema = {
  boolField: boolean,
};

export type ReferenceSetSchema = {
  boolField: boolean,
  stringField: string,
  numberField: number,
};

export type ReferenceSetOnlyStringSchema = {
  stringField: string,
};

export type ReferenceFooSchema = {
  numberField: number,
  refField: ReferenceBarSchema,
};

export type ReferenceSchema = {
  stringField: string,
  refField: ?ReferenceFooSchema,
  referenceField: ReferenceFooSchema,
  subsetRefField: ReferenceSetOnlyStringSchema,
};
