import PropTypes from 'prop-types';

export const ShapeReferencePriceShape = PropTypes.shape({
  amount: PropTypes.number,
  nativeAmount: PropTypes.number,
  exchangeRate: PropTypes.number,
});

export const ShapeReferenceShape = PropTypes.shape({
  fees: ShapeReferencePriceShape,
  taxes: ShapeReferencePriceShape.isRequired,
  total: ShapeReferencePriceShape.isRequired,
});
