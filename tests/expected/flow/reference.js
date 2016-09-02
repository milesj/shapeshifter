// @flow

export type ReferenceBarShape = {
  boolField: boolean,
};

export type ReferenceSetOnlyStringShape = {
  stringField: string,
};

export type ReferenceSetShape = {
  boolField: boolean,
  stringField: string,
  numberField: number,
};

export type ReferenceFooShape = {
  numberField: number,
  refField: ReferenceBarShape,
};

export type ReferenceShape = {
  stringField: string,
  refField: ?ReferenceFooShape,
  referenceField: ReferenceFooShape,
  subsetRefField: ReferenceSetOnlyStringShape,
};
