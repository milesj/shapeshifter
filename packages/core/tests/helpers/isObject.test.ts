import isObject from '../../src/helpers/isObject';
import { allValues } from '../../../../tests/mocks';

describe('helpers/isObject', () => {
  it('returns false for non-objects', () => {
    allValues.filter(value => typeof value !== 'object').forEach(value => {
      expect(isObject(value)).toBe(false);
    });
  });

  it('returns false for arrays', () => {
    expect(isObject([])).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
  });

  it('returns false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('returns true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: 'value' })).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
  });
});
