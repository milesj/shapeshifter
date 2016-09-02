// @flow

export type ReferenceSelfBasicShape = {
  stringField: string,
};

export type ReferenceSelfShape = {
  stringField: string,
  referenceField: ReferenceSelfShape,
  requiredRefField: ?ReferenceSelfShape,
  subsetRefField: Array<ReferenceSelfBasicShape>,
};
