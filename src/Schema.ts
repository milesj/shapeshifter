/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import isObject from './helpers/isObject';
import {
  PrimaryKey,
  Relation,
  RelationSuffixes,
  SchemaMap,
  SchemaExpandedMap,
  MetadataField,
} from './types';

const BELONGS_TO: string = 'belongsTo';
const BELONGS_TO_MANY: string = 'belongsToMany';
const HAS_ONE: string = 'hasOne';
const HAS_MANY: string = 'hasMany';
const MORPH_TO: string = 'morphTo';
const MORPH_TO_MANY: string = 'morphToMany';

export default class Schema {
  static HAS_ONE: string = HAS_ONE;

  static HAS_MANY: string = HAS_MANY;

  static BELONGS_TO: string = BELONGS_TO;

  static BELONGS_TO_MANY: string = BELONGS_TO_MANY;

  static MORPH_TO: string = MORPH_TO;

  static MORPH_TO_MANY: string = MORPH_TO_MANY;

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
    params: Partial<Relation> = {},
  ): this {
    if (process.env.NODE_ENV !== 'production') {
      if (!(schema instanceof Schema)) {
        throw new TypeError(`Relation "${attribute}" is not a valid schema.`);
      } else if (this.relationTypes[attribute]) {
        throw new Error(
          `Relation "${attribute}" has already been mapped as "${this.relationTypes[attribute]}".`,
        );
      }
    }

    // Set relations
    this.relations.push({
      ...params,
      attribute,
      collection:
        relation === BELONGS_TO_MANY || relation === HAS_MANY || relation === MORPH_TO_MANY,
      relation,
      schema,
    });

    this.relationTypes[attribute] = relation;

    // Set attributes
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
  define(relations: SchemaExpandedMap): this {
    Object.keys(relations).forEach((attribute: string) => {
      const schema = relations[attribute];

      if (schema instanceof Schema) {
        this.addRelation(attribute, schema, HAS_ONE);
      } else if (Array.isArray(schema)) {
        this.addRelation(attribute, schema[0], HAS_MANY);
      } else if (isObject(schema)) {
        this.addRelation(attribute, schema.schema, schema.relation, schema);
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
  morphTo(attribute: string, schema: Schema, suffixes: RelationSuffixes = {}): this {
    return this.addRelation(attribute, schema, MORPH_TO, suffixes);
  }

  /**
   * Map morph-to-many nested entities by attribute name.
   */
  morphToMany(attribute: string, schema: Schema, suffixes: RelationSuffixes = {}): this {
    return this.addRelation(attribute, schema, MORPH_TO_MANY, suffixes);
  }
}
