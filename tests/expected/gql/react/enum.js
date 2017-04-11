import PropTypes from 'prop-types';

export const EnumShape = PropTypes.shape({
  field: PropTypes.oneOf([
    'FOO',
    'BAR',
    'BAZ',
    'QUX',
  ]),
});
