export interface ReferenceBarSchema {
  boolField?: boolean;
}

export interface ReferenceSetOnlyStringSchema {
  stringField?: string;
}

export interface ReferenceSetSchema {
  boolField?: boolean;
  stringField?: string;
  numberField?: number;
}

export interface ReferenceFooSchema {
  numberField?: number;
  refField: ReferenceBarSchema;
}

export interface ReferenceSchema {
  stringField?: string;
  refField?: ReferenceFooSchema;
  referenceField?: ReferenceFooSchema;
  subsetRefField?: ReferenceSetOnlyStringSchema;
}
