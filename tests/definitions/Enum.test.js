import { expect } from 'chai';
import { falsyValues } from '../mock-data';
import { COMPOUND_TYPES } from '../../lib/constants';
import EnumDefinition from '../../lib/definitions/Enum';

describe('definitions/Enum', () => {
  it('errors if `valueType` is empty', () => {
    falsyValues.forEach(value => {
      expect(() => (
        new EnumDefinition('foo', { valueType: value })
      )).to.throw(SyntaxError, 'Enum definitions require a "valueType" property.');
    });
  });

  it('errors if `valueType` is a non-primitive type', () => {
    COMPOUND_TYPES.forEach(value => {
      expect(() => (
        new EnumDefinition('foo', { valueType: value })
      )).to.throw(TypeError, `Enum value type "${value}" not supported.`);
    });
  });

  it('errors if `values` is not an array', () => {
    expect(() => (
      new EnumDefinition('foo', { valueType: 'string', values: 'string' })
    )).to.throw(TypeError, 'Enum values must be an array.');
  });

  it('errors if `values` do not match the type in `valueType`', () => {
    it('for strings', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'string', values: ['foo', 123] })
      )).to.throw(TypeError, 'Enum values do not match the defined value type.');
    });

    it('for booleans', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'bool', values: [true, 123] })
      )).to.throw(TypeError, 'Enum values do not match the defined value type.');
    });

    it('for numbers', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'number', values: [123, 'foo'] })
      )).to.throw(TypeError, 'Enum values do not match the defined value type.');
    });

    it('for functions (uses strings)', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'function', values: ['foo', 123] })
      )).to.throw(TypeError, 'Enum values do not match the defined value type.');
    });
  });

  it('does not error if `values` match the type in `valueType`', () => {
    it('for strings', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'string', values: ['foo', 'bar'] })
      )).to.not.throw(TypeError);
    });

    it('for booleans', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'bool', values: [true, false] })
      )).to.not.throw(TypeError);
    });

    it('for numbers', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'number', values: [123, 456.789] })
      )).to.not.throw(TypeError);
    });

    it('for functions (uses strings)', () => {
      expect(() => (
        new EnumDefinition('foo', { valueType: 'function', values: ['foo', 'namespace.bar'] })
      )).to.not.throw(TypeError);
    });
  });
});
