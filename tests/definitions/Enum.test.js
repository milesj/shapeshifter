import { options, falsyValues } from '../mocks';
import { COMPOUND_TYPES } from '../../src/constants';
import EnumDefinition from '../../src/definitions/Enum';

describe('definitions/Enum', () => {
  it('errors if `valueType` is empty', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: value })
      )).toThrowError('Enum definitions require a "valueType" property.');
    });
  });

  it('errors if `valueType` is a non-primitive type', () => {
    COMPOUND_TYPES.forEach((value) => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: value })
      )).toThrowError(`Enum value type "${value}" not supported.`);
    });
  });

  it('errors if `values` is not an array', () => {
    expect(() => (
      new EnumDefinition(options, 'foo', { valueType: 'string', values: 'string' })
    )).toThrowError('Enum values must be a non-empty array.');
  });

  it('errors if `values` is empty', () => {
    expect(() => (
      new EnumDefinition(options, 'foo', { valueType: 'string', values: [] })
    )).toThrowError('Enum values must be a non-empty array.');
  });

  it('errors if `values` do not match the type in `valueType`', () => {
    it('for strings', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'string', values: ['foo', 123] })
      )).toThrowError('Enum values do not match the defined value type.');
    });

    it('for booleans', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'bool', values: [true, 123] })
      )).toThrowError('Enum values do not match the defined value type.');
    });

    it('for numbers', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'number', values: [123, 'foo'] })
      )).toThrowError('Enum values do not match the defined value type.');
    });

    it('for functions (uses strings)', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'function', values: [() => {}, 123] })
      )).toThrowError('Enum values do not match the defined value type.');
    });
  });

  it('does not error if `values` match the type in `valueType`', () => {
    it('for strings', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'string', values: ['foo', 'bar'] })
      )).not.toThrowError();
    });

    it('for booleans', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'bool', values: [true, false] })
      )).not.toThrowError();
    });

    it('for numbers', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'number', values: [123, 456.789] })
      )).not.toThrowError();
    });

    it('for functions (uses strings)', () => {
      expect(() => (
        new EnumDefinition(options, 'foo', { valueType: 'function', values: ['foo', 'namespace.bar'] })
      )).not.toThrowError();
    });
  });
});
