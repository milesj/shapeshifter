import { expect } from 'chai';
import { options, falsyValues } from '../mocks';
import ShapeDefinition from '../../lib/definitions/Shape';
import NumberDefinition from '../../lib/definitions/Number';
import StringDefinition from '../../lib/definitions/String';

describe('definitions/Shape', () => {
  it('errors if `attributes` is empty', () => {
    falsyValues.forEach(value => {
      expect(() => (
        new ShapeDefinition(options, 'foo', { attributes: value })
      )).to.throw(SyntaxError,
        'Shape definitions require an "attributes" property, ' +
        'which is an object mapping of attributes to type definitions.');
    });
  });

  it('errors if `attributes` has no properties', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { attributes: {} })
    )).to.throw(SyntaxError,
      'Shape definitions require an "attributes" property, ' +
      'which is an object mapping of attributes to type definitions.');
  });

  it('creates an array of `Definition`s for `attributes`', () => {
    const def = new ShapeDefinition(options, 'foo', {
      attributes: {
        foo: 'string',
        bar: 'number',
      },
    });

    expect(def.attributes[0]).to.be.instanceOf(StringDefinition);
    expect(def.attributes[1]).to.be.instanceOf(NumberDefinition);
  });
});
