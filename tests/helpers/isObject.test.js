import { expect } from 'chai';
import isObject from '../../src/helpers/isObject';
import { allValues } from '../mocks';

describe('helpers/isObject', () => {
  it('returns false for non-objects', () => {
    allValues
      .filter(value => typeof value !== 'object')
      .forEach((value) => {
        expect(isObject(value)).to.equal(false);
      });
  });

  it('returns false for arrays', () => {
    expect(isObject([])).to.equal(false);
    expect(isObject([1, 2, 3])).to.equal(false);
  });

  it('returns false for null', () => {
    expect(isObject(null)).to.equal(false);
  });

  it('returns true for objects', () => {
    expect(isObject({})).to.equal(true);
    expect(isObject({ key: 'value' })).to.equal(true);
    expect(isObject(Object.create(null))).to.equal(true);
  });
});
