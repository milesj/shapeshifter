import indent from '../../src/helpers/indent';

describe('helpers/indent', () => {
  it('creates an indentation based on depth', () => {
    expect(indent(1)).toBe('  ');
    expect(indent(3)).toBe('      ');
    expect(indent(5)).toBe('          ');
  });

  it('can customize the spacer character', () => {
    expect(indent(1, 'x')).toBe('x');
    expect(indent(3, 'x')).toBe('xxx');
    expect(indent(5, 'x')).toBe('xxxxx');
  });
});
