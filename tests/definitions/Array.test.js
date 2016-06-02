import { expect } from 'chai';
import { falsyValues } from '../mock-data';
import ArrayDefinition from '../../lib/definitions/Array';
import StringDefinition from '../../lib/definitions/String';

describe('definitions/Array', () => {
  it('errors if `valueType` is empty', () => {
    falsyValues.forEach(value => {
      expect(() => (
        new ArrayDefinition('foo', { valueType: value })
      )).to.throw(SyntaxError, 'Array definitions require a "valueType" property.');
    });
  });

  it('creates a `Definition` for the `valueType`', () => {
    const def = new ArrayDefinition('foo', { valueType: 'string' });

    expect(def.valueType).to.be.instanceOf(StringDefinition);
  });
});
