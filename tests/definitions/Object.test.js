import { options, falsyValues, truthyValues } from '../mocks';
import ObjectDefinition from '../../src/definitions/Object';
import NumberDefinition from '../../src/definitions/Number';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Object', () => {
  it('errors if `valueType` is empty', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new ObjectDefinition(options, 'foo', { valueType: value })
      )).toThrowError('Object definitions require a "valueType" property.');
    });
  });

  it('errors if `keyType` is empty', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new ObjectDefinition(options, 'foo', { keyType: value, valueType: 'string' })
      )).toThrowError('Object definitions require a "keyType" property.');
    });
  });

  it('errors if `keyType` is not a string', () => {
    truthyValues
      .filter(value => typeof value !== 'string')
      .forEach((value) => {
        expect(() => (
          new ObjectDefinition(options, 'foo', { keyType: value, valueType: 'string' })
        )).toThrow();
      });
  });

  it('creates a `Definition` for the `valueType`', () => {
    const def = new ObjectDefinition(options, 'foo', { valueType: 'number' });

    expect(def.valueType).toBeInstanceOf(NumberDefinition);
  });

  it('creates a `Definition` for the `keyType`', () => {
    const def = new ObjectDefinition(options, 'foo', { valueType: 'number', keyType: 'string' });

    expect(def.keyType).toBeInstanceOf(StringDefinition);
  });
});
