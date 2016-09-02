export interface SetsBasicShape {
  foo?: string;
  baz: boolean;
}

export interface SetsWithRequiredShape {
  bar: number;
  baz?: boolean;
  qux?: () => void;
}

export interface SetsWithNullShape {
  foo?: string;
  qux?: () => void;
}

export interface SetsWithBothShape {
  baz: boolean;
  qux: () => void;
}

export interface SetsShape {
  foo?: string;
  bar?: number;
  baz: boolean;
  qux?: () => void;
}
