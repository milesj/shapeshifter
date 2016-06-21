
export interface SetsSchema {
  foo: string;
  bar: number;
  baz: boolean;
  qux: () => void;
}

export interface SetsBasicSchema {
  foo: string;
  baz: boolean;
}

export interface SetsWithRequiredSchema {
  bar: number;
  baz: boolean;
  qux: () => void;
}

export interface SetsWithNullSchema {
  foo: string;
  qux: () => void;
}

export interface SetsWithBothSchema {
  baz: boolean;
  qux: () => void;
}
