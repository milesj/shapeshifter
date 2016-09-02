export interface ReferenceSelfBasicInterface {
  stringField?: string;
}

export interface ReferenceSelfInterface {
  stringField?: string;
  referenceField?: ReferenceSelfInterface;
  requiredRefField: ReferenceSelfInterface;
  subsetRefField?: Array<ReferenceSelfBasicInterface>;
}
