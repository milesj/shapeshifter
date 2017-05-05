import NumberDefinition from '../src/definitions/Number';
import Schematic from '../src/Schematic';
import StringDefinition from '../src/definitions/String';
import { options } from './mocks';

describe('Schematic', () => {
  const data = {
    name: 'Foo',
    attributes: {
      foo: 'string',
      bar: 'number',
    },
  };

  it('allows a JSON or literal object', () => {
    const schema = new Schematic('/foo.json', data, options);

    expect(schema.data).toEqual(data);
  });

  it('errors if no `name` property', () => {
    expect(() => new Schematic('/foo.json', {}, options)).toThrowError('[foo.json] No name found in schema.');
  });

  it('errors if no `attributes` property', () => {
    expect(() => new Schematic('/foo.json', {
      name: 'Foo',
    }, options)).toThrowError('[Foo] No attributes found in schema.');
  });

  it('errors if no `attributes` defined', () => {
    expect(() => new Schematic('/foo.json', {
      name: 'Foo',
      attributes: {},
    }, options)).toThrowError('[Foo] No attributes found in schema.');
  });

  it('does not error if `name` and `attributes` are defined', () => {
    expect(() => new Schematic('/foo.json', data, options)).not.toThrowError();
  });

  it('errors if `imports` is defined and not an array', () => {
    expect(() => new Schematic('/foo.json', {
      ...data,
      imports: true,
    }, options)).toThrowError('[Foo] Schema imports must be an array of import declarations.');
  });

  it('errors if `constants` is defined and not an object', () => {
    expect(() => new Schematic('/foo.json', {
      ...data,
      constants: 123,
    }, options)).toThrowError('[Foo] Schema constants must be an object that maps to primitive values.');
  });

  it('errors if `subsets` is defined and not an object', () => {
    expect(() => new Schematic('/foo.json', {
      ...data,
      subsets: 123,
    }, options)).toThrowError('[Foo] Schema subsets must be an object.');
  });

  it('errors if `references` is defined and not an object', () => {
    expect(() => new Schematic('/foo.json', {
      ...data,
      references: 123,
    }, options)).toThrowError('[Foo] Schema references must be an object that maps to other schemas.');
  });

  it('errors if `meta` is defined and not an object', () => {
    expect(() => new Schematic('/foo.json', {
      ...data,
      meta: 123,
    }, options)).toThrowError('[Foo] Schema metadata must be an object of strings.');
  });

  it('errors if `shapes` is defined and not an object', () => {
    expect(() => new Schematic('/foo.json', {
      ...data,
      shapes: 123,
    }, options)).toThrowError('[Foo] Schema shapes must be an object.');
  });

  it('creates an array of `Definition`s for `attributes`', () => {
    const schema = new Schematic('/foo.json', data, options);

    expect(schema.attributes[0]).toBeInstanceOf(StringDefinition);
    expect(schema.attributes[1]).toBeInstanceOf(NumberDefinition);
  });
});
