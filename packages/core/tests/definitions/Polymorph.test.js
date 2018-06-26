import { options } from '../../../../tests/mocks';
import PolymorphDefinition from '../../src/definitions/Polymorph';
import BoolDefinition from '../../src/definitions/Bool';
import NumberDefinition from '../../src/definitions/Number';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Polymorph', () => {
  it('errors if `valueTypes` is not an array', () => {
    expect(() => new PolymorphDefinition(options, 'foo', { valueTypes: 123 })).toThrowError(
      'Invalid PolymorphDefinition field "valueTypes". Must be an array.',
    );
  });

  it('errors if `valueTypes` has no items', () => {
    expect(() => new PolymorphDefinition(options, 'foo', { valueTypes: [] })).toThrowError(
      'Invalid PolymorphDefinition field "valueTypes". Array cannot be empty.',
    );
  });

  it('creates an array of `Definition`s for `valueTypes`', () => {
    const def = new PolymorphDefinition(options, 'foo', {
      valueTypes: ['bool', 'number', 'string'],
    });

    expect(def.valueTypes[0]).toBeInstanceOf(BoolDefinition);
    expect(def.valueTypes[1]).toBeInstanceOf(NumberDefinition);
    expect(def.valueTypes[2]).toBeInstanceOf(StringDefinition);
  });
});
