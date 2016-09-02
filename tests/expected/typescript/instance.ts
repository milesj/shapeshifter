import InstanceDefault, { InstanceClassName } from '../stub';

export const INST_STR = 'foobar';
export const INST_ENABLED = true;

export interface InstanceShape {
  instField?: InstanceClassName;
  instanceField?: InstanceDefault;
}
