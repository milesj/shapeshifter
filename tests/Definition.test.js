import Definition from '../src/Definition';
import { options } from './mocks';

describe('Definition', () => {
  it('inherits default config and sets attribute', () => {
    const def = new Definition(options, 'foo', { key: 'value' });

    expect(def.attribute).toBe('foo');
    expect(def.config).toEqual({
      null: false,
      required: false,
      key: 'value',
    });
  });

  it('allows for null and required to be customized', () => {
    const def = new Definition(options, 'foo', { null: false, required: true });

    expect(def.isNullable()).toBe(false);
    expect(def.isRequired()).toBe(true);
  });

  it('validates null and required', () => {
    expect(() => (
      new Definition(options, 'foo', { null: 'string' })
    )).toThrowError('Invalid type detected, "null" property must be a boolean.');

    expect(() => (
      new Definition(options, 'foo', { required: 'string' })
    )).toThrowError('Invalid type detected, "required" property must be a boolean.');
  });
});
