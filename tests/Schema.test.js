import Schema from '../src/Schema';

describe('Schema', () => {
  let schema;
  const foo = new Schema('foos');
  const qux = new Schema('quxs', 'uuid');

  beforeEach(() => {
    schema = new Schema('bars');
  });

  describe('constructor()', () => {
    it('inherits primary key and metadata', () => {
      schema = new Schema('bars', 'uuid', { foo: 'bar' });

      expect(schema.primaryKey).toBe('uuid');
      expect(schema.metadata).toEqual({ foo: 'bar' });
    });

    it('allows metadata as 2nd argument', () => {
      schema = new Schema('bars', { foo: 'bar' });

      expect(schema.primaryKey).toBe('id');
      expect(schema.metadata).toEqual({ foo: 'bar' });
    });

    it('can pass primary key through metadata', () => {
      schema = new Schema('bars', { primaryKey: 'uuid', foo: 'bar' });

      expect(schema.primaryKey).toBe('uuid');
      expect(schema.metadata).toEqual({ primaryKey: 'uuid', foo: 'bar' });
    });
  });

  describe('addAttributes()', () => {
    it('adds attributes', () => {
      expect(schema.attributes).toEqual([]);

      schema.addAttributes(['foo', 'bar']);

      expect(schema.attributes).toEqual(['foo', 'bar']);

      schema.addAttributes(['baz']);

      expect(schema.attributes).toEqual(['foo', 'bar', 'baz']);
    });
  });

  describe('addRelation()', () => {
    it('errors if not a schema', () => {
      expect(() => {
        schema.addRelation('foo', 'bar');
      }).toThrowError('Relation "foo" is not a valid schema.');
    });

    it('errors if been mapped before', () => {
      expect(() => {
        schema.addRelation('foo', new Schema(), Schema.HAS_ONE);
        schema.addRelation('foo', new Schema(), Schema.HAS_MANY);
      }).toThrowError('Relation "foo" has already been mapped as "hasOne".');
    });
  });

  describe('belongsTo()', () => {
    it('adds a schema and maps the attribute', () => {
      expect(schema.relations).toEqual([]);

      schema.belongsTo({ qux });

      expect(schema.relations).toEqual([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'belongsTo',
          collection: false,
        },
      ]);
      expect(schema.attributes).toEqual(['qux']);
    });
  });

  describe('belongsToMany()', () => {
    it('adds a schema and maps the attribute', () => {
      expect(schema.relations).toEqual([]);

      schema.belongsToMany({ qux });

      expect(schema.relations).toEqual([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'belongsToMany',
          collection: true,
        },
      ]);
      expect(schema.attributes).toEqual(['qux']);
    });
  });

  describe('hasOne()', () => {
    it('adds a schema and maps the attribute', () => {
      expect(schema.relations).toEqual([]);

      schema.hasOne({ qux });

      expect(schema.relations).toEqual([
        {
          attribute: 'qux',
          schema: qux,
          relation: 'hasOne',
          collection: false,
        },
      ]);
      expect(schema.attributes).toEqual(['qux']);
    });
  });

  describe('hasMany()', () => {
    it('adds a schema and maps the attribute', () => {
      schema.hasMany({ foo, qux });

      expect(schema.relations).toEqual([
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
      expect(schema.attributes).toEqual(['foo', 'qux']);
    });
  });
});
