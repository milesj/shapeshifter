import normalizeType from '../../src/helpers/normalizeType';

describe('helpers/normalizeType', () => {
  it('returns the name of built-in types', () => {
    [
      'array', 'enum', 'instance', 'object',
      'shape', 'union', 'reference',
      'boolean', 'number', 'string',
    ].forEach((value) => {
      expect(normalizeType(value)).toBe(value);
    });
  });

  it('supports upper case names', () => {
    expect(normalizeType('NUMBER')).toBe('number');
    expect(normalizeType('BOOL')).toBe('boolean'); // Alias
  });

  it('handles aliases', () => {
    expect(normalizeType('bool')).toBe('boolean');
    expect(normalizeType('inst')).toBe('instance');
    expect(normalizeType('int')).toBe('number');
    expect(normalizeType('integer')).toBe('number');
    expect(normalizeType('num')).toBe('number');
    expect(normalizeType('float')).toBe('number');
    expect(normalizeType('obj')).toBe('object');
    expect(normalizeType('struct')).toBe('shape');
    expect(normalizeType('str')).toBe('string');
  });
});
