export const PRIMITIVE_VALUES = ['string', 123, true];
export const PRIMITIVE_STR = 'primitive';

export interface PrimitiveShape {
  boolField?: boolean;
  boolFieldExpanded: boolean;
  booleanField?: boolean;
  booleanFieldExpanded?: boolean;
  funcField: () => void;
  functionField?: (arg0?: string) => void;
  intField?: number;
  intFieldExpanded?: number;
  integerField?: number;
  integerFieldExpanded: number;
  numField?: number;
  numFieldExpanded?: number;
  numberField?: number;
  numberFieldExpanded: number;
  floatField?: number;
  floatFieldExpanded: number;
  strField?: string;
  strFieldExpanded?: string;
  stringField?: string;
  stringFieldExpanded?: string;
}
