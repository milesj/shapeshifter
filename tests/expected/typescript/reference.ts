export interface ReferenceBarSchema {
  boolField?: boolean;
}

export interface ReferenceSetSchema {
  boolField?: boolean;
  stringField?: string;
  numberField?: number;
}

export interface ReferenceSetOnlyStringSchema {
  stringField?: string;
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
