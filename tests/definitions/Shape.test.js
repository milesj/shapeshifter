import { options, falsyValues } from '../mocks';
import ShapeDefinition from '../../src/definitions/Shape';
import NumberDefinition from '../../src/definitions/Number';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Shape', () => {
  it('doesnt error if a `reference` is defined', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { reference: 'foo' })
    )).not.toThrowError();
  });

  it('errors if neither `attributes` or `reference` is defined', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', {})
    )).toThrowError('Shape definitions require an "attributes" or "reference" property.');
  });

  it('errors if `reference` is not a string', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { reference: 123 })
    )).toThrowError('Shape reference must be a string.');
  });

  it('errors if `attributes` is empty', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new ShapeDefinition(options, 'foo', { attributes: value })
      )).toThrowError('Shape definitions require an "attributes" or "reference" property.');
    });
  });

  it('errors if `attributes` has no properties', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { attributes: {} })
    )).toThrowError('Shape attributes must be a mapping of type definitions.');
  });

  it('creates an array of `Definition`s for `attributes`', () => {
    const def = new ShapeDefinition(options, 'foo', {
      attributes: {
        foo: 'string',
        bar: 'number',
      },
    });

    expect(def.attributes[0]).toBeInstanceOf(StringDefinition);
    expect(def.attributes[1]).toBeInstanceOf(NumberDefinition);
  });
});
