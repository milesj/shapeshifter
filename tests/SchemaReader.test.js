import { expect } from 'chai';
import { options, allValues } from './mocks';
import SchemaReader from '../lib/SchemaReader';
import NumberDefinition from '../lib/definitions/Number';
import StringDefinition from '../lib/definitions/String';

describe('Schema', () => {
  const data = {
    name: 'Foo',
    attributes: {
      foo: 'string',
      bar: 'number',
    },
  };

  it('parses a JSON string', () => {
    const schema = new SchemaReader('/foo.json', JSON.stringify(data), options);

    expect(schema.data).to.deep.equal(data);
  });

  it('errors on an invalid JSON string', () => {
    expect(() => new SchemaReader('/foo.json', 'This:is{invalid}Json"', options)).to.throw(SyntaxError);
  });

  it('allows a JSON or literal object', () => {
    const schema = new SchemaReader('/foo.json', data, options);

    expect(schema.data).to.deep.equal(data);
  });

  it('errors if the schema is not an object or JSON string', () => {
    const invalidValues = allValues
      .filter(value => typeof value !== 'object' && typeof value !== 'string')
      .concat([[]]); // Re-add arrays

    invalidValues.forEach(value => {
      expect(() => new SchemaReader('/foo.json', value, options)).to.throw(SyntaxError, '[foo.json] Schema requires a valid JSON structure.');
    });
  });

  it('errors if no `name` property', () => {
    expect(() => new SchemaReader('/foo.json', {}, options)).to.throw(SyntaxError, '[foo.json] No name found in schema.');
  });

  it('errors if no `attributes` property', () => {
    expect(() => new SchemaReader('/foo.json', {
      name: 'Foo',
    }, options)).to.throw(SyntaxError, '[Foo] No attributes found in schema.');
  });

  it('errors if no `attributes` defined', () => {
    expect(() => new SchemaReader('/foo.json', {
      name: 'Foo',
      attributes: {},
    }, options)).to.throw(SyntaxError, '[Foo] No attributes found in schema.');
  });

  it('does not error if `name` and `attributes` are defined', () => {
    expect(() => new SchemaReader('/foo.json', data, options)).to.not.throw(Error);
  });

  it('errors if `imports` is defined and not an array', () => {
    expect(() => new SchemaReader('/foo.json', {
      ...data,
      imports: true,
    }, options)).to.throw(SyntaxError, '[Foo] Schema imports must be an array of import declarations.');
  });

  it('errors if `constants` is defined and not an object', () => {
    expect(() => new SchemaReader('/foo.json', {
      ...data,
      constants: 123,
    }, options)).to.throw(SyntaxError, '[Foo] Schema constants must be an object that maps to primitive values.');
  });

  it('errors if `subsets` is defined and not an object', () => {
    expect(() => new SchemaReader('/foo.json', {
      ...data,
      subsets: 123,
    }, options)).to.throw(SyntaxError, '[Foo] Schema subsets must be an object.');
  });

  it('errors if `references` is defined and not an object', () => {
    expect(() => new SchemaReader('/foo.json', {
      ...data,
      references: 123,
    }, options)).to.throw(SyntaxError, '[Foo] Schema references must be an object that maps to other schemas.');
  });

  it('errors if `meta` is defined and not an object', () => {
    expect(() => new SchemaReader('/foo.json', {
      ...data,
      meta: 123,
    }, options)).to.throw(SyntaxError, '[Foo] Schema metadata must be an object of strings.');
  });

  it('creates an array of `Definition`s for `attributes`', () => {
    const schema = new SchemaReader('/foo.json', data, options);

    expect(schema.attributes[0]).to.be.instanceOf(StringDefinition);
    expect(schema.attributes[1]).to.be.instanceOf(NumberDefinition);
  });
});
