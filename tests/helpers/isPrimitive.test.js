import isPrimitive from '../../src/helpers/isPrimitive';
import { COMPOUND_TYPES, PRIMITIVE_TYPES } from '../../src/constants';

describe('helpers/isPrimitive', () => {
  it('returns false for compound types', () => {
    COMPOUND_TYPES.forEach((value) => {
      expect(isPrimitive(value)).toBe(false);
    });
  });

  it('returns true for primitive types', () => {
    PRIMITIVE_TYPES.forEach((value) => {
      expect(isPrimitive(value)).toBe(true);
    });
  });

  it('normalizes type names', () => {
    expect(isPrimitive('int')).toBe(true);
    expect(isPrimitive('struct')).toBe(false);
  });
});
