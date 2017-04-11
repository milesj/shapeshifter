import PropTypes from 'prop-types';

export const PRIMITIVE_VALUES = ['string', 123, true];
export const PRIMITIVE_STR = 'primitive';

export const PrimitiveShape = PropTypes.shape({
  boolField: PropTypes.bool,
  boolFieldExpanded: PropTypes.bool.isRequired,
  booleanField: PropTypes.bool,
  booleanFieldExpanded: PropTypes.bool.isRequired,
  intField: PropTypes.number,
  intFieldExpanded: PropTypes.number.isRequired,
  integerField: PropTypes.number,
  integerFieldExpanded: PropTypes.number.isRequired,
  numField: PropTypes.number,
  numFieldExpanded: PropTypes.number.isRequired,
  numberField: PropTypes.number,
  numberFieldExpanded: PropTypes.number.isRequired,
  floatField: PropTypes.number,
  floatFieldExpanded: PropTypes.number.isRequired,
  strField: PropTypes.string,
  strFieldExpanded: PropTypes.string.isRequired,
  stringField: PropTypes.string,
  stringFieldExpanded: PropTypes.string.isRequired,
});
