import { expect } from 'chai';
import { TYPES } from '../../src/constants';
import normalizeType from '../../src/helpers/normalizeType';

describe('helpers/normalizeType', () => {
  it('returns the name of built-in types', () => {
    TYPES.forEach((value) => {
      expect(normalizeType(value)).to.equal(value);
    });
  });

  it('supports upper case names', () => {
    expect(normalizeType('NUMBER')).to.equal('number');
    expect(normalizeType('BOOL')).to.equal('boolean'); // Alias
  });

  it('handles aliases', () => {
    expect(normalizeType('bool')).to.equal('boolean');
    expect(normalizeType('func')).to.equal('function');
    expect(normalizeType('inst')).to.equal('instance');
    expect(normalizeType('int')).to.equal('number');
    expect(normalizeType('integer')).to.equal('number');
    expect(normalizeType('num')).to.equal('number');
    expect(normalizeType('float')).to.equal('number');
    expect(normalizeType('obj')).to.equal('object');
    expect(normalizeType('struct')).to.equal('shape');
    expect(normalizeType('str')).to.equal('string');
  });
});
