export interface ShapeReferencePriceInterface {
  amount: number;
  nativeAmount: number;
  exchangeRate: number;
}

export interface ShapeReferenceInterface {
  fees: ShapeReferencePriceInterface;
  taxes: ShapeReferencePriceInterface;
  total: ShapeReferencePriceInterface;
}
