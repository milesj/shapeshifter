export interface ReferenceSelfBasicSchema {
  stringField?: string;
}

export interface ReferenceSelfSchema {
  stringField?: string;
  referenceField?: ReferenceSelfSchema;
  requiredRefField: ReferenceSelfSchema;
  subsetRefField?: Array<ReferenceSelfBasicSchema>;
}
