// @flow

export type ReferenceSelfBasicSchema = {
  stringField: string,
};

export type ReferenceSelfSchema = {
  stringField: string,
  referenceField: ReferenceSelfSchema,
  requiredRefField: ?ReferenceSelfSchema,
  subsetRefField: Array<ReferenceSelfBasicSchema>,
};
