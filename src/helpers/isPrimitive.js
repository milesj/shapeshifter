import { PRIMITIVE_TYPES } from '../constants';

export default function isPrimitive(value) {
  return (PRIMITIVE_TYPES.indexOf(typeof value) >= 0);
}
