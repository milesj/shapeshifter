import { PropTypes } from 'react';

export const PRIMITIVE_VALUES = ['string', 123, true];
export const PRIMITIVE_STR = 'primitive';

export const PrimitiveShape = PropTypes.shape({
  boolField: PropTypes.bool,
  boolFieldExpanded: PropTypes.bool.isRequired,
  booleanField: PropTypes.bool,
  booleanFieldExpanded: PropTypes.bool,
  funcField: PropTypes.func.isRequired,
  functionField: PropTypes.func,
  intField: PropTypes.number,
  intFieldExpanded: PropTypes.number,
  integerField: PropTypes.number,
  integerFieldExpanded: PropTypes.number.isRequired,
  numField: PropTypes.number,
  numFieldExpanded: PropTypes.number,
  numberField: PropTypes.number,
  numberFieldExpanded: PropTypes.number.isRequired,
  floatField: PropTypes.number,
  floatFieldExpanded: PropTypes.number.isRequired,
  strField: PropTypes.string,
  strFieldExpanded: PropTypes.string,
  stringField: PropTypes.string,
  stringFieldExpanded: PropTypes.string,
});
