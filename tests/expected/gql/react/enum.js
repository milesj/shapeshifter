import { PropTypes } from 'react';

export const EnumShape = PropTypes.shape({
  field: PropTypes.oneOf([
    'FOO',
    'BAR',
    'BAZ',
    'QUX',
  ]),
});
