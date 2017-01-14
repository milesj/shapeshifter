import { PropTypes } from 'react';

export const ArrayShape = PropTypes.shape({
  arrayField: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  boolField: PropTypes.arrayOf(PropTypes.bool),
  numberField: PropTypes.arrayOf(PropTypes.number).isRequired,
  stringField: PropTypes.arrayOf(PropTypes.string),
});
