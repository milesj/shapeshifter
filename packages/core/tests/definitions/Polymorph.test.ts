import { options } from '../mocks';
import PolymorphDefinition from '../../src/definitions/Polymorph';
import BoolDefinition from '../../src/definitions/Bool';
import NumberDefinition from '../../src/definitions/Number';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Polymorph', () => {
  it('errors if `valueTypes` is not an array', () => {
    // @ts-expect-error
    expect(() => new PolymorphDefinition(options, 'foo', { valueTypes: 123 })).toThrow(
      'Invalid PolymorphDefinition field "valueTypes". Must be an array.',
    );
  });

  it('errors if `valueTypes` has no items', () => {
    expect(() => new PolymorphDefinition(options, 'foo', { valueTypes: [] })).toThrow(
      'Invalid PolymorphDefinition field "valueTypes". Array cannot be empty.',
    );
  });

  it('creates an array of `Definition`s for `valueTypes`', () => {
    // @ts-expect-error
    const def = new PolymorphDefinition(options, 'foo', {
      valueTypes: ['bool', 'number', 'string'],
    });

    expect(def.valueTypes[0]).toBeInstanceOf(BoolDefinition);
    expect(def.valueTypes[1]).toBeInstanceOf(NumberDefinition);
    expect(def.valueTypes[2]).toBeInstanceOf(StringDefinition);
  });
});
