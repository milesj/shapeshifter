import { expect } from 'chai';
import { PRIMITIVE_TYPES, COMPOUND_TYPES } from '../../lib/constants';
import isPrimitive from '../../lib/helpers/isPrimitive';

describe('helpers/isPrimitive', () => {
  it('returns false for compound types', () => {
    COMPOUND_TYPES.forEach((value) => {
      expect(isPrimitive(value)).to.equal(false);
    });
  });

  it('returns true for primitive types', () => {
    PRIMITIVE_TYPES.forEach((value) => {
      expect(isPrimitive(value)).to.equal(true);
    });
  });

  it('normalizes type names', () => {
    expect(isPrimitive('int')).to.equal(true);
    expect(isPrimitive('struct')).to.equal(false);
  });
});
