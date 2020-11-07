import isPrimitive from '../../src/helpers/isPrimitive';

describe('helpers/isPrimitive', () => {
  it('returns false for compound types', () => {
    ['array', 'enum', 'instance', 'object', 'shape', 'union', 'reference'].forEach((value) => {
      expect(isPrimitive(value)).toBe(false);
    });
  });

  it('returns true for primitive types', () => {
    ['boolean', 'number', 'string', 'key'].forEach((value) => {
      expect(isPrimitive(value)).toBe(true);
    });
  });

  it('normalizes type names', () => {
    expect(isPrimitive('int')).toBe(true);
    expect(isPrimitive('struct')).toBe(false);
  });
});
