// @flow

export type ReferenceSelfType = {
  stringField: ?string,
  referenceField: ?ReferenceSelfType,
  requiredRefField: ReferenceSelfType,
};
