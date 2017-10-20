/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import type { PrimaryKey, Relation, SchemaExpandedMap, SchemaMap } from './types';

const BELONGS_TO: string = 'belongsTo';
const BELONGS_TO_MANY: string = 'belongsToMany';
const HAS_ONE: string = 'hasOne';
const HAS_MANY: string = 'hasMany';

export default class Schema {
  attributes: string[];

  metadata: Object;

  primaryKey: PrimaryKey;

  relations: Relation[];

  relationTypes: { [key: string]: string };

  resourceName: string;

  static HAS_ONE: string = HAS_ONE;

  static HAS_MANY: string = HAS_MANY;

  static BELONGS_TO: string = BELONGS_TO;

  static BELONGS_TO_MANY: string = BELONGS_TO_MANY;

  /**
   * Represents a basic relational schema for an entity.
   */
  constructor(
    resourceName: string,
    primaryKey: PrimaryKey | Object = 'id',
    metadata: Object = {},
  ) {
    /* eslint-disable no-param-reassign */
    if (typeof primaryKey === 'object' && !Array.isArray(primaryKey)) {
      metadata = primaryKey;
      primaryKey = metadata.primaryKey || 'id';
    }
    /* eslint-enable no-param-reassign */

    this.attributes = [];
    this.metadata = metadata;
    this.primaryKey = primaryKey;
    this.relations = [];
    this.relationTypes = {};
    this.resourceName = resourceName;
  }

  /**
   * Map a list of attribute names.
   */
  addAttributes(attributes: string[]): this {
    this.attributes = this.attributes.concat(attributes);

    return this;
  }

  /**
   * Map a one/many relational schema to the current schema.
   */
  addRelation(attribute: string, schema: Schema, relation: string): this {
    if (__DEV__) {
      if (!(schema instanceof Schema)) {
        throw new TypeError(`Relation "${attribute}" is not a valid schema.`);
      } else if (this.relationTypes[attribute]) {
        throw new Error(
          `Relation "${attribute}" has already been mapped as "${this.relationTypes[attribute]}".`,
        );
      }
    }

    this.relations.push({
      attribute,
      collection: (relation === BELONGS_TO_MANY || relation === HAS_MANY),
      relation,
      schema,
    });

    this.relationTypes[attribute] = relation;

    if (this.attributes.indexOf(attribute) === -1) {
      this.attributes.push(attribute);
    }

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

      if (Array.isArray(schema)) {
        this.addRelation(attribute, schema[0], HAS_MANY);
      } else {
        this.addRelation(attribute, schema, HAS_ONE);
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
}
