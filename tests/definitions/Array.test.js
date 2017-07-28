import { options } from '../mocks';
import ArrayDefinition from '../../src/definitions/Array';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Array', () => {
  it('errors if `valueType` is missing', () => {
    expect(() => (
      new ArrayDefinition(options, 'foo', {})
    )).toThrowError('Invalid ArrayDefinition option "valueType". Field is required and must be defined.');
  });

  it('errors if `valueType` is empty', () => {
    expect(() => (
      new ArrayDefinition(options, 'foo', { valueType: '' })
    )).toThrowError('Invalid ArrayDefinition option "valueType". String cannot be empty.');
  });

  it('errors if `valueType` is the wrong type', () => {
    expect(() => (
      new ArrayDefinition(options, 'foo', { valueType: 123 })
    )).toThrowError('Invalid ArrayDefinition option "valueType". Type must be one of: String, Shape');
  });

  it('creates a `Definition` for the `valueType`', () => {
    const def = new ArrayDefinition(options, 'foo', { valueType: 'string' });

    expect(def.valueType).toBeInstanceOf(StringDefinition);
  });
});
