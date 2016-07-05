// @flow
import InstanceDefault, { InstanceClassName } from '../stub';

export const INST_STR = 'foobar';
export const INST_ENABLED = true;

export type InstanceSchema = {
  instField: InstanceClassName,
  instanceField: InstanceDefault,
};
