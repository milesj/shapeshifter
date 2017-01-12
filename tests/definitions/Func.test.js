import { options } from '../mocks';
import FuncDefinition from '../../src/definitions/Func';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Func', () => {
  it('errors if `argTypes` is not an array', () => {
    expect(() => (
      new FuncDefinition(options, 'foo', { argTypes: 'foo' })
    )).toThrowError('Function argument types must be an array of type definitions.');
  });

  it('creates a `Definition` for the `returnType`', () => {
    const def = new FuncDefinition(options, 'foo', { returnType: 'string' });

    expect(def.returnType).toBeInstanceOf(StringDefinition);
  });

  it('creates a `Definition` for each `argTypes`', () => {
    const def = new FuncDefinition(options, 'foo', { argTypes: ['string'] });

    expect(def.argTypes[0]).toBeInstanceOf(StringDefinition);
  });
});
