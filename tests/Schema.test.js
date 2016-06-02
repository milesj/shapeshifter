import { expect } from 'chai';
import Schema from '../lib/Schema';
import { allValues } from './mock-data';

describe('Schema', () => {
  const data = {
    name: 'Foo',
    attributes: { foo: 'string' },
  };

  it('parses a JSON string', () => {
    const schema = new Schema(JSON.stringify(data));

    expect(schema.schema).to.deep.equal(data);
  });

  it('errors on an invalid JSON string');

  it('allows a JSON or literal object', () => {
    const schema = new Schema(data);

    expect(schema.schema).to.deep.equal(data);
  });

  it('errors if the schema is not an object or JSON string', () => {
    const invalidValues = allValues
      .filter(value => typeof value !== 'object' && typeof value !== 'string')
      .concat([[]]); // Re-add arrays

    invalidValues.forEach(value => {
      expect(() => new Schema(value)).to.throw(SyntaxError, 'Schema requires a valid JSON structure.');
    });
  });

  it('errors if no `name` property', () => {
    expect(() => new Schema({})).to.throw(SyntaxError, 'No name found in schema.');
  });

  it('errors if no `attributes` property', () => {
    expect(() => new Schema({
      name: 'Foo',
    })).to.throw(SyntaxError, 'No attributes found in schema.');
  });

  it('errors if no `attributes` defined', () => {
    expect(() => new Schema({
      name: 'Foo',
      attributes: {},
    })).to.throw(SyntaxError, 'No attributes found in schema.');
  });
});
