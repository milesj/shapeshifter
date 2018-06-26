import Definition from '../src/Definition';
import { options } from '../../../tests/mocks';

describe('Definition', () => {
  it('inherits default config and sets attribute', () => {
    const def = new Definition(options, 'foo', { key: 'value' });

    expect(def.attribute).toBe('foo');
    expect(def.config).toEqual({
      nullable: false,
      optional: true,
      key: 'value',
      type: 'unknown',
    });
  });

  it('allows for nullable to be customized', () => {
    const def = new Definition(options, 'foo', { nullable: false });

    expect(def.isNullable()).toBe(false);
  });

  it('allows for optional to be customized', () => {
    const def = new Definition(options, 'foo', { optional: false });

    expect(def.isOptional()).toBe(false);
  });

  it('validates nullable', () => {
    expect(() => new Definition(options, 'foo', { nullable: 'string' })).toThrowError(
      'Invalid Definition field "nullable". Must be a boolean.',
    );
  });

  it('validates optional', () => {
    expect(() => new Definition(options, 'foo', { optional: 'string' })).toThrowError(
      'Invalid Definition field "optional". Must be a boolean.',
    );
  });
});
