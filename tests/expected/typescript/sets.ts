export interface SetsBasicInterface {
  foo?: string;
  baz: boolean;
}

export interface SetsWithRequiredInterface {
  bar: number;
  baz?: boolean;
  qux?: string;
}

export interface SetsWithNullInterface {
  foo?: string;
  qux?: string;
}

export interface SetsWithBothInterface {
  baz: boolean;
  qux: string;
}

export interface SetsInterface {
  foo?: string;
  bar?: number;
  baz: boolean;
  qux?: string;
}
