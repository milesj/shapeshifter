/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

const BELONGS_TO: string = 'belongsTo';
const BELONGS_TO_MANY: string = 'belongsToMany';
const HAS_ONE: string = 'hasOne';
const HAS_MANY: string = 'hasMany';

/* eslint-disable no-use-before-define */
type SchemaMap = { [attribute: string]: Schema };
type PrimaryKey = string | string[];
type Relation = {
  attribute: string,
  collection: boolean,
  relation: string,
  schema: Schema,
};
/* eslint-enable no-use-before-define */

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
    if (typeof primaryKey === 'object' && !Array.isArray(primaryKey)) {
      metadata = primaryKey;
      primaryKey = metadata.primaryKey || 'id';
    }

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
    if (!(schema instanceof Schema)) {
      throw new Error(`Relation "${attribute}" is not a valid schema.`);

    } else if (this.relationTypes[attribute]) {
      throw new Error(
        `Relation "${attribute}" has already been mapped as "${this.relationTypes[attribute]}".`,
      );
    }

    this.relations.push({
      attribute,
      schema,
      relation,
      collection: (relation === BELONGS_TO_MANY || relation === HAS_MANY),
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
