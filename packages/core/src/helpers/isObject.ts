/**
 * Return true if the value is a literal object.
 */
export default function isObject<T>(value: unknown): value is T {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
