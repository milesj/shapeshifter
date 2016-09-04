import { expect } from 'chai';
import Schema from '../lib/Schema';

describe('Schema', () => {
  const schema = new Schema();

  describe('addAttributes()', () => {
    it('adds attributes', () => {
      expect(schema.attributes).to.deep.equal([]);

      schema.addAttributes(['foo', 'bar']);

      expect(schema.attributes).to.deep.equal(['foo', 'bar']);

      schema.addAttributes(['baz']);

      expect(schema.attributes).to.deep.equal(['foo', 'bar', 'baz']);
    });
  });

  /*
  describe('addRelations()', () => {
    it('errors if not a schema', () => {
      expect(() => {
        schema.addRelations({
          foo: 'bar',
        });
      }).to.throw(Error, 'Relation "foo" is not an schema schema.');
    });

    it('adds a schema and maps the attribute', () => {
      const qux = new Schema();
      qux.primaryKey = 'uuid';

      expect(schema.relations).to.deep.equal({});

      schema.addRelations({ qux });

      expect(schema.relations).to.deep.equal({ qux });
      expect(schema.attributes).to.deep.equal(['foo', 'bar', 'baz', 'qux']);
    });
  });
  */
});
