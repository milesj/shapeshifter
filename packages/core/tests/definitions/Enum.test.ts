import { options } from '../mocks';
import EnumDefinition from '../../src/definitions/Enum';

describe('definitions/Enum', () => {
  it('errors if `valueType` is missing', () => {
    expect(() => new EnumDefinition(options, 'foo', {})).toThrow(
      'Invalid EnumDefinition field "valueType". Field is required and must be defined.',
    );
  });

  it('errors if `valueType` is empty', () => {
    expect(
      () => new EnumDefinition(options, 'foo', { valueType: '' }),
    ).toThrowErrorMatchingSnapshot();
  });

  it('errors if `values` is not an array', () => {
    expect(
      // @ts-ignore
      () => new EnumDefinition(options, 'foo', { valueType: 'string', values: 'string' }),
    ).toThrow('Invalid EnumDefinition field "values". Must be an array.');
  });

  it('errors if `values` is empty', () => {
    expect(
      () => new EnumDefinition(options, 'foo', { valueType: 'string', values: [] }),
    ).toThrow('Invalid EnumDefinition field "values". Array cannot be empty.');
  });

  describe('errors if `values` do not match the type in `valueType`', () => {
    it('for strings', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'string', values: ['foo', 123] }),
      ).toThrow('Enum values do not match the defined value type.');
    });

    it('for booleans', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'bool', values: [true, 123] }),
      ).toThrow('Enum values do not match the defined value type.');
    });

    it('for numbers', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'number', values: [123, 'foo'] }),
      ).toThrow('Enum values do not match the defined value type.');
    });
  });

  describe('does not error if `values` match the type in `valueType`', () => {
    it('for strings', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'string', values: ['foo', 'bar'] }),
      ).not.toThrow();
    });

    it('for booleans', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'bool', values: [true, false] }),
      ).not.toThrow();
    });

    it('for numbers', () => {
      expect(
        () => new EnumDefinition(options, 'foo', { valueType: 'number', values: [123, 456.789] }),
      ).not.toThrow();
    });
  });

  it('does not error if `constant` is true', () => {
    expect(
      () =>
        new EnumDefinition(options, 'foo', {
          valueType: 'number',
          values: ['foo', 'bar'],
          constant: true,
        }),
    ).not.toThrow();
  });
});
