// @flow

export type ReferenceBarType = {
  boolField: boolean,
};

export type ReferenceSetOnlyStringType = {
  stringField: string,
};

export type ReferenceSetType = {
  boolField: boolean,
  stringField: string,
  numberField: number,
};

export type ReferenceFooType = {
  numberField: number,
  refField: ReferenceBarType,
};

export type ReferenceType = {
  stringField: string,
  refField: ?ReferenceFooType,
  referenceField: ReferenceFooType,
  subsetRefField: ReferenceSetOnlyStringType,
};
