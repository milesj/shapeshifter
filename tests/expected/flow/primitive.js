// @flow

export const PRIMITIVE_VALUES = ['string', 123, true];
export const PRIMITIVE_STR = 'primitive';

export type PrimitiveSchema = {
  boolField: boolean,
  boolFieldExpanded: boolean,
  booleanField: boolean,
  booleanFieldExpanded: boolean,
  funcField: () => void,
  functionField: ?() => void,
  intField: number,
  intFieldExpanded: number,
  integerField: number,
  integerFieldExpanded: number,
  numField: number,
  numFieldExpanded: ?number,
  numberField: number,
  numberFieldExpanded: number,
  floatField: number,
  floatFieldExpanded: number,
  strField: string,
  strFieldExpanded: string,
  stringField: string,
  stringFieldExpanded: string,
};
