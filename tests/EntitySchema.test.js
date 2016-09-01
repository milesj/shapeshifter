import { expect } from 'chai';
import EntitySchema from '../lib/EntitySchema';

describe('EntitySchema', () => {
  const entity = new EntitySchema();

  describe('addAttributes()', () => {
    it('adds attributes', () => {
      expect(entity.attributes).to.deep.equal([]);

      entity.addAttributes(['foo', 'bar']);

      expect(entity.attributes).to.deep.equal(['foo', 'bar']);

      entity.addAttributes(['baz']);

      expect(entity.attributes).to.deep.equal(['foo', 'bar', 'baz']);
    });
  });

  describe('addRelations()', () => {
    it('errors if not a schema', () => {
      expect(() => {
        entity.addRelations({
          foo: 'bar',
        });
      }).to.throw(Error, 'Relation "foo" is not an entity schema.');
    });

    it('adds a schema and maps the attribute', () => {
      const qux = new EntitySchema();
      qux.primaryKey = 'uuid';

      expect(entity.relations).to.deep.equal({});

      entity.addRelations({ qux });

      expect(entity.relations).to.deep.equal({ qux });
      expect(entity.attributes).to.deep.equal(['foo', 'bar', 'baz', 'qux']);
    });
  });
});
