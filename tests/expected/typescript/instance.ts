import InstNamespace, { InstanceClassName } from '../stub';

export const INST_STR = 'foobar';
export const INST_ENABLED = true;

export interface InstanceSchema {
  instField?: InstanceClassName;
  instanceField?: InstNamespace.InstanceClassName;
}
