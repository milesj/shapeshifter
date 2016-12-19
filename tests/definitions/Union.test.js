import { expect } from 'chai';
import { options, falsyValues } from '../mocks';
import UnionDefinition from '../../src/definitions/Union';
import BoolDefinition from '../../src/definitions/Bool';
import NumberDefinition from '../../src/definitions/Number';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Union', () => {
  it('errors if `valueTypes` is not an array', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new UnionDefinition(options, 'foo', { valueTypes: value })
      )).to.throw(SyntaxError,
        'Union definitions require a "valueTypes" property, ' +
        'which is a list of type definitions');
    });
  });

  it('errors if `valueTypes` has no items', () => {
    expect(() => (
      new UnionDefinition(options, 'foo', { valueTypes: [] })
    )).to.throw(SyntaxError,
      'Union definitions require a "valueTypes" property, ' +
      'which is a list of type definitions');
  });

  it('creates an array of `Definition`s for `valueTypes`', () => {
    const def = new UnionDefinition(options, 'foo', {
      valueTypes: ['bool', 'number', 'string'],
    });

    expect(def.valueTypes[0]).to.be.instanceOf(BoolDefinition);
    expect(def.valueTypes[1]).to.be.instanceOf(NumberDefinition);
    expect(def.valueTypes[2]).to.be.instanceOf(StringDefinition);
  });
});
