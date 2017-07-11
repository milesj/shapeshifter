import { options } from '../mocks';
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
    )).toThrowError('ShapeDefinition: Only one of these options may be defined: reference, attributes');
  });

  it('errors if `reference` is not a string', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { reference: 123 })
    )).toThrowError('Invalid ShapeDefinition option "reference". Must be a string.');
  });

  it('errors if `attributes` is a non-object', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { attributes: 'foo' })
    )).toThrowError('Invalid ShapeDefinition option "attributes". Must be a plain object.');
  });

  it('errors if `attributes` has no properties', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { attributes: {} })
    )).toThrowError('Invalid ShapeDefinition option "attributes". Object cannot be empty.');
  });

  it('errors if `attributes` has the wrong values', () => {
    expect(() => (
      new ShapeDefinition(options, 'foo', { attributes: { foo: 123 } })
    )).toThrowError('Invalid ShapeDefinition option "attributes.foo". Type must be one of: string, shape.');
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
