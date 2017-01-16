import { PropTypes } from 'react';
import InstanceDefault, { InstanceClassName } from '../stub';

export const INST_STR = 'foobar';
export const INST_ENABLED = true;

export const InstanceShape = PropTypes.shape({
  instField: PropTypes.instanceOf(InstanceClassName),
  instanceField: PropTypes.instanceOf(InstanceDefault).isRequired,
});
