import { options } from '../mocks';
import ArrayDefinition from '../../src/definitions/Array';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Array', () => {
  it('errors if `valueType` is missing', () => {
    expect(() => new ArrayDefinition(options, 'foo', {})).toThrow(
      'Invalid ArrayDefinition field "valueType". Field is required and must be defined.',
    );
  });

  it('errors if `valueType` is empty', () => {
    expect(
      () => new ArrayDefinition(options, 'foo', { valueType: '' }),
    ).toThrowErrorMatchingSnapshot();
  });

  it('errors if `valueType` is the wrong type', () => {
    // @ts-ignore
    expect(() => new ArrayDefinition(options, 'foo', { valueType: 123 })).toThrow(
      'Invalid ArrayDefinition field "valueType". Type must be one of: string, shape',
    );
  });

  it('creates a `Definition` for the `valueType`', () => {
    const def = new ArrayDefinition(options, 'foo', { valueType: 'string' });

    expect(def.valueType).toBeInstanceOf(StringDefinition);
  });
});
