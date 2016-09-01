import { expect } from 'chai';
import { falsyValues, truthyValues } from '../mocks';
import ObjectDefinition from '../../lib/definitions/Object';
import NumberDefinition from '../../lib/definitions/Number';
import StringDefinition from '../../lib/definitions/String';

describe('definitions/Object', () => {
  it('errors if `valueType` is empty', () => {
    falsyValues.forEach(value => {
      expect(() => (
        new ObjectDefinition('foo', { valueType: value })
      )).to.throw(SyntaxError, 'Object definitions require a "valueType" property.');
    });
  });

  it('errors if `keyType` is empty', () => {
    falsyValues.forEach(value => {
      expect(() => (
        new ObjectDefinition('foo', { keyType: value, valueType: 'string' })
      )).to.throw(SyntaxError, 'Object definitions require a "keyType" property.');
    });
  });

  it('errors if `keyType` is not a string', () => {
    truthyValues
      .filter(value => typeof value !== 'string')
      .forEach(value => {
        expect(() => (
          new ObjectDefinition('foo', { keyType: value, valueType: 'string' })
        )).to.throw(TypeError);
      });
  });

  it('creates a `Definition` for the `valueType`', () => {
    const def = new ObjectDefinition('foo', { valueType: 'number' });

    expect(def.valueType).to.be.instanceOf(NumberDefinition);
  });

  it('creates a `Definition` for the `keyType`', () => {
    const def = new ObjectDefinition('foo', { valueType: 'number', keyType: 'string' });

    expect(def.keyType).to.be.instanceOf(StringDefinition);
  });
});
