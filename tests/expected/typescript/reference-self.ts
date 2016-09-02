export interface ReferenceSelfBasicShape {
  stringField?: string;
}

export interface ReferenceSelfShape {
  stringField?: string;
  referenceField?: ReferenceSelfShape;
  requiredRefField: ReferenceSelfShape;
  subsetRefField?: Array<ReferenceSelfBasicShape>;
}
