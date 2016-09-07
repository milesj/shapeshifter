import { expect } from 'chai';
import Schema from '../lib/Schema';

describe('Schema', () => {
  let schema;
  const foo = new Schema('foos');
  const qux = new Schema('quxs', 'uuid');

  beforeEach(() => {
    schema = new Schema('bars');
  });

  describe('addAttributes()', () => {
    it('adds attributes', () => {
      expect(schema.attributes).to.deep.equal([]);

      schema.addAttributes(['foo', 'bar']);

      expect(schema.attributes).to.deep.equal(['foo', 'bar']);

      schema.addAttributes(['baz']);

      expect(schema.attributes).to.deep.equal(['foo', 'bar', 'baz']);
    });
  });

  describe('addRelation()', () => {
    it('errors if not a schema', () => {
      expect(() => {
        schema.addRelation('foo', 'bar');
      }).to.throw(Error, 'Relation "foo" is not a valid schema.');
    });

    it('errors if been mapped before', () => {
      expect(() => {
        schema.addRelation('foo', new Schema(), Schema.HAS_ONE);
        schema.addRelation('foo', new Schema(), Schema.HAS_MANY);
      }).to.throw(Error, 'Relation "foo" has already been mapped as "hasOne".');
    });
  });

  describe('belongsTo()', () => {
    it('adds a schema and maps the attribute', () => {
      expect(schema.relations).to.deep.equal([]);

      schema.belongsTo({ qux });

      expect(schema.relations).to.deep.equal([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'belongsTo',
          collection: false,
        },
      ]);
      expect(schema.attributes).to.deep.equal(['qux']);
    });
  });

  describe('belongsToMany()', () => {
    it('adds a schema and maps the attribute', () => {
      expect(schema.relations).to.deep.equal([]);

      schema.belongsToMany({ qux });

      expect(schema.relations).to.deep.equal([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'belongsToMany',
          collection: true,
        },
      ]);
      expect(schema.attributes).to.deep.equal(['qux']);
    });
  });

  describe('hasOne()', () => {
    it('adds a schema and maps the attribute', () => {
      expect(schema.relations).to.deep.equal([]);

      schema.hasOne({ qux });

      expect(schema.relations).to.deep.equal([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'hasOne',
          collection: false,
        },
      ]);
      expect(schema.attributes).to.deep.equal(['qux']);
    });
  });

  describe('hasMany()', () => {
    it('adds a schema and maps the attribute', () => {
      schema.hasMany({ foo, qux });

      expect(schema.relations).to.deep.equal([
        {
          attribute: 'foo',
          schema: foo,
          relation: 'hasMany',
          collection: true,
        },
        {
          attribute: 'qux',
          schema: qux,
          relation: 'hasMany',
          collection: true,
        },
      ]);
      expect(schema.attributes).to.deep.equal(['foo', 'qux']);
    });
  });
});
