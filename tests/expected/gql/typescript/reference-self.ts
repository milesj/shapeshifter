export interface ReferenceSelfInterface {
  stringField: string;
  referenceField: ReferenceSelfInterface;
  requiredRefField: ReferenceSelfInterface;
}
