import { PropTypes } from 'react';
import DefaultName from '../stub';
import { foo, bar } from '../stub';
import AnotherDefault, { Baz, QUX } from '../stub';

export const ImportsSchema = PropTypes.shape({
  stringField: PropTypes.string,
});
