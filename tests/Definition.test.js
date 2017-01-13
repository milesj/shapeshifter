import Definition from '../src/Definition';
import { options } from './mocks';

describe('Definition', () => {
  it('inherits default config and sets attribute', () => {
    const def = new Definition(options, 'foo', { key: 'value' });

    expect(def.attribute).toBe('foo');
    expect(def.config).toEqual({
      nullable: true,
      key: 'value',
    });
  });

  it('allows for nullable to be customized', () => {
    const def = new Definition(options, 'foo', { nullable: false });

    expect(def.isNullable()).toBe(false);
  });

  it('validates nullable', () => {
    expect(() => (
      new Definition(options, 'foo', { nullable: 'string' })
    )).toThrowError('Invalid type detected, "nullable" property must be a boolean.');
  });
});
