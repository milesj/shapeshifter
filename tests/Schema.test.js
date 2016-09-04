import { expect } from 'chai';
import Schema from '../lib/Schema';

describe('Schema', () => {
  const schema = new Schema();

  const foo = new Schema();

  const qux = new Schema();
  qux.primaryKey = 'uuid';

  describe('addAttributes()', () => {
    it('adds attributes', () => {
      expect(schema.attributes).to.deep.equal([]);

      schema.addAttributes(['foo', 'bar']);

      expect(schema.attributes).to.deep.equal(['foo', 'bar']);

      schema.addAttributes(['baz']);

      expect(schema.attributes).to.deep.equal(['foo', 'bar', 'baz']);
    });
  });

  describe('hasOne()', () => {
    it('errors if not a schema', () => {
      expect(() => {
        schema.hasOne({
          foo: 'bar',
        });
      }).to.throw(Error, 'One relation "foo" is not a valid schema.');
    });

    it('adds a schema and maps the attribute', () => {
      expect(schema.relations).to.deep.equal([]);

      schema.hasOne({ qux });

      expect(schema.relations).to.deep.equal([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'one',
        },
      ]);
      expect(schema.attributes).to.deep.equal(['foo', 'bar', 'baz', 'qux']);
    });
  });

  describe('hasMany()', () => {
    it('errors if not a schema', () => {
      expect(() => {
        schema.hasMany({
          foo: 'bar',
        });
      }).to.throw(Error, 'Many relation "foo" is not a valid schema.');
    });

    it('adds a schema and maps the attribute', () => {
      schema.hasMany({ foo });

      expect(schema.relations).to.deep.equal([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'one',
        },
        {
          attribute: 'foo',
          schema: foo,
          relation: 'many',
        },
      ]);
      expect(schema.attributes).to.deep.equal(['foo', 'bar', 'baz', 'qux']);
    });
  });
});
