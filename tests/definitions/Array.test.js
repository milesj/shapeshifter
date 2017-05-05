import { falsyValues, options } from '../mocks';
import ArrayDefinition from '../../src/definitions/Array';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Array', () => {
  it('errors if `valueType` is empty', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new ArrayDefinition(options, 'foo', { valueType: value })
      )).toThrowError('Array definitions require a "valueType" property.');
    });
  });

  it('creates a `Definition` for the `valueType`', () => {
    const def = new ArrayDefinition(options, 'foo', { valueType: 'string' });

    expect(def.valueType).toBeInstanceOf(StringDefinition);
  });
});
