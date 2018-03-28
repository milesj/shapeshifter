import { options } from '../mocks';
import EnumDefinition from '../../src/definitions/Enum';

describe('definitions/Enum', () => {
  it('errors if `valueType` is missing', () => {
    expect(() => new EnumDefinition(options, 'foo', {})).toThrowError(
      'Invalid EnumDefinition field "valueType". Field is required and must be defined.',
    );
  });

  it('errors if `valueType` is empty', () => {
    expect(() => new EnumDefinition(options, 'foo', { valueType: '' })).toThrowError(
      'Invalid EnumDefinition field "valueType". String cannot be empty.',
    );
  });

  it('errors if `values` is not an array', () => {
    expect(
      () => new EnumDefinition(options, 'foo', { valueType: 'string', values: 'string' }),
    ).toThrowError('Invalid EnumDefinition field "values". Must be an array.');
  });

  it('errors if `values` is empty', () => {
    expect(
      () => new EnumDefinition(options, 'foo', { valueType: 'string', values: [] }),
    ).toThrowError('Invalid EnumDefinition field "values". Array cannot be empty.');
  });

  describe('errors if `values` do not match the type in `valueType`', () => {
    it('for strings', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'string', values: ['foo', 123] }),
      ).toThrowError('Enum values do not match the defined value type.');
    });

    it('for booleans', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'bool', values: [true, 123] }),
      ).toThrowError('Enum values do not match the defined value type.');
    });

    it('for numbers', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'number', values: [123, 'foo'] }),
      ).toThrowError('Enum values do not match the defined value type.');
    });
  });

  describe('does not error if `values` match the type in `valueType`', () => {
    it('for strings', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'string', values: ['foo', 'bar'] }),
      ).not.toThrowError();
    });

    it('for booleans', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'bool', values: [true, false] }),
      ).not.toThrowError();
    });

    it('for numbers', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'number', values: [123, 456.789] }),
      ).not.toThrowError();
    });
  });
});
