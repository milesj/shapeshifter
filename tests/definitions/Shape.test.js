import { expect } from 'chai';
import { options, falsyValues } from '../mocks';
import ShapeDefinition from '../../lib/definitions/Shape';
import NumberDefinition from '../../lib/definitions/Number';
import StringDefinition from '../../lib/definitions/String';

describe('definitions/Shape', () => {
  it('doesnt error if a `reference` is defined', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { reference: 'foo' })
    )).to.not.throw(Error);
  });

  it('errors if neither `attributes` or `reference` is defined', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', {})
    )).to.throw(SyntaxError, 'Shape definitions require an "attributes" or "reference" property.');
  });

  it('errors if `reference` is not a string', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { reference: 123 })
    )).to.throw(TypeError, 'Shape reference must be a string.');
  });

  it('errors if `attributes` is empty', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new ShapeDefinition(options, 'foo', { attributes: value })
      )).to.throw(SyntaxError,
        'Shape definitions require an "attributes" or "reference" property.');
    });
  });

  it('errors if `attributes` has no properties', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { attributes: {} })
    )).to.throw(TypeError, 'Shape attributes must be a mapping of type definitions.');
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
