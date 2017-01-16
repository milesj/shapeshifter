// @flow

export type ShapeReferencePriceType = {
  amount: ?number,
  nativeAmount: ?number,
  exchangeRate: ?number,
};

export type ShapeReferenceType = {
  fees: ?ShapeReferencePriceType,
  taxes: ShapeReferencePriceType,
  total: ShapeReferencePriceType,
};
