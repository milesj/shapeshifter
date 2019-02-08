import isObject from './helpers/isObject';
import {
  PrimaryKey,
  Relation,
  PolymorphRelation,
  SchemaMap,
  DefineRelationMap,
  MetadataField,
} from './types';

const BELONGS_TO = 'belongsTo';
const BELONGS_TO_MANY = 'belongsToMany';
const HAS_ONE = 'hasOne';
const HAS_MANY = 'hasMany';
const MORPH_TO = 'morphTo';

export default class Schema<T = any> {
  static HAS_ONE: string = HAS_ONE;

  static HAS_MANY: string = HAS_MANY;

  static BELONGS_TO: string = BELONGS_TO;

  static BELONGS_TO_MANY: string = BELONGS_TO_MANY;

  static MORPH_TO: string = MORPH_TO;

  attributes: string[] = [];

  metadata: MetadataField;

  primaryKey: PrimaryKey;

  relations: Relation[] = [];

  relationTypes: { [key: string]: string } = {};

  resourceName: string;

  /**
   * Represents a basic relational schema for an entity.
   */
  constructor(
    resourceName: string,
    primaryKey: PrimaryKey | MetadataField = 'id',
    metadata: MetadataField = {},
  ) {
    /* eslint-disable no-param-reassign */
    if (isObject(primaryKey)) {
      metadata = primaryKey as MetadataField;
      primaryKey = metadata.primaryKey || 'id';
    }
    /* eslint-enable no-param-reassign */

    this.resourceName = resourceName;
    this.primaryKey = primaryKey as PrimaryKey;
    this.metadata = metadata;
  }

  /**
   * Map a list of attribute names.
   */
  addAttributes(attributes: string[]): this {
    this.attributes = Array.from(new Set([...this.attributes, ...attributes]));

    return this;
  }

  /**
   * Map a one/many relational schema to the current schema.
   */
  addRelation(
    attribute: string,
    schema: Schema,
    relation: string,
    polymorph?: PolymorphRelation,
  ): this {
    if (__DEV__) {
      if (!(schema instanceof Schema)) {
        throw new TypeError(`Relation "${attribute}" is not a valid schema.`);
      } else if (this.relationTypes[attribute] && this.relationTypes[attribute] !== relation) {
        throw new Error(
          `Relation "${attribute}" has already been mapped as "${this.relationTypes[attribute]}".`,
        );
      }
    }

    const params: Relation = {
      attribute,
      collection: relation === BELONGS_TO_MANY || relation === HAS_MANY,
      relation,
      schema,
    };

    if (polymorph) {
      params.polymorph = polymorph;
    }

    this.relations.push(params);
    this.relationTypes[attribute] = relation;

    this.addAttributes([attribute]);

    return this;
  }

  /**
   * Map multiple relations for a specific type.
   */
  addRelations(schemas: SchemaMap, relation: string): this {
    Object.keys(schemas).forEach((attribute: string) => {
      this.addRelation(attribute, schemas[attribute], relation);
    });

    return this;
  }

  /**
   * Map belongs-to nested entities by attribute name.
   */
  belongsTo(relations: SchemaMap): this {
    return this.addRelations(relations, BELONGS_TO);
  }

  /**
   * Map belongs-to-many nested entities by attribute name.
   */
  belongsToMany(relations: SchemaMap): this {
    return this.addRelations(relations, BELONGS_TO_MANY);
  }

  /**
   * Define multiple relationships using a compact syntax.
   */
  define(relations: DefineRelationMap): this {
    Object.keys(relations).forEach((attribute: string) => {
      const schema = relations[attribute];

      if (schema instanceof Schema) {
        this.addRelation(attribute, schema, HAS_ONE);
      } else if (Array.isArray(schema)) {
        this.addRelation(attribute, schema[0], HAS_MANY);
      }
    });

    return this;
  }

  /**
   * Map has-one nested entities by attribute name.
   */
  hasOne(relations: SchemaMap): this {
    return this.addRelations(relations, HAS_ONE);
  }

  /**
   * Map has-many nested entities by attribute name.
   */
  hasMany(relations: SchemaMap): this {
    return this.addRelations(relations, HAS_MANY);
  }

  /**
   * Map morph-to nested entities by attribute name.
   */
  morphTo(
    schemas: SchemaMap,
    attribute: string,
    typeSuffix: string = '_type',
    keySuffix: string = '_id',
  ): this {
    Object.keys(schemas).forEach((type: string) => {
      this.addRelation(attribute, schemas[type], MORPH_TO, {
        keySuffix,
        type,
        typeSuffix,
      });
    });

    return this;
  }
}
