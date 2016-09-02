export interface ReferenceBarShape {
  boolField?: boolean;
}

export interface ReferenceSetOnlyStringShape {
  stringField?: string;
}

export interface ReferenceSetShape {
  boolField?: boolean;
  stringField?: string;
  numberField?: number;
}

export interface ReferenceFooShape {
  numberField?: number;
  refField: ReferenceBarShape;
}

export interface ReferenceShape {
  stringField?: string;
  refField?: ReferenceFooShape;
  referenceField?: ReferenceFooShape;
  subsetRefField?: ReferenceSetOnlyStringShape;
}
