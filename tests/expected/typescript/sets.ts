export interface SetsBasicInterface {
  foo?: string;
  baz: boolean;
}

export interface SetsWithRequiredInterface {
  bar: number;
  baz?: boolean;
  qux?: () => void;
}

export interface SetsWithNullInterface {
  foo?: string;
  qux?: () => void;
}

export interface SetsWithBothInterface {
  baz: boolean;
  qux: () => void;
}

export interface SetsInterface {
  foo?: string;
  bar?: number;
  baz: boolean;
  qux?: () => void;
}
