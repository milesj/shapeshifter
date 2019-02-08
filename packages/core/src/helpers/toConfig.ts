import { Config } from '../types';

export default function toConfig(value: string | Config): Config {
  return typeof value === 'string' ? { type: value } : value;
}
