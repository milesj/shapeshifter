import { PropTypes } from 'react';
import DefaultName from '../stub';
import { foo, bar } from '../stub';
import AnotherDefault, { Baz, Qux } from '../stub';

export const ImportsSchema = PropTypes.shape({
  stringField: PropTypes.string,
});
