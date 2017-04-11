import PropTypes from 'prop-types';
import DefaultName from '../stub';
import AnotherDefault, { Baz, Qux } from '../stub';

export const ImportsShape = PropTypes.shape({
  stringField: PropTypes.string,
});
