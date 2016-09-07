/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

const BELONGS_TO = 'belongsTo';
const BELONGS_TO_MANY = 'belongsToMany';
const HAS_ONE = 'hasOne';
const HAS_MANY = 'hasMany';

export default class Schema {
  /**
   * Represents a basic relational schema for an entity.
   *
   * @param {String} resourceName
   * @param {String} [primaryKey]
   */
  constructor(resourceName, primaryKey = 'id') {
    this.resourceName = resourceName;
    this.primaryKey = primaryKey;
    this.attributes = [];
    this.relations = [];
    this.relationTypes = {};
  }

  /**
   * Map a list of attribute names.
   *
   * @param {String[]} attributes
   * @returns {Schema}
   */
  addAttributes(attributes) {
    this.attributes = this.attributes.concat(attributes);

    return this;
  }

  /**
   * Map a one/many relational schema to the current schema.
   *
   * @param {String} attribute
   * @param {Schema} schema
   * @param {String} relation
   * @returns {Schema}
   */
  addRelation(attribute, schema, relation) {
    if (!(schema instanceof Schema)) {
      throw new Error(`Relation "${attribute}" is not a valid schema.`);

    } else if (this.relationTypes[attribute]) {
      throw new Error(
        `Relation "${attribute}" has already been mapped as "${this.relationTypes[attribute]}".`
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
   *
   * @param {Object} schemas
   * @param {String} relation
   * @returns {Schema}
   */
  addRelations(schemas, relation) {
    Object.keys(schemas).forEach((attribute) => {
      this.addRelation(attribute, schemas[attribute], relation);
    });

    return this;
  }

  /**
   * Map belongs-to nested entities by attribute name.
   *
   * @param {Object} relations
   * @returns {Schema}
   */
  belongsTo(relations) {
    return this.addRelations(relations, BELONGS_TO);
  }

  /**
   * Map belongs-to-many nested entities by attribute name.
   *
   * @param {Object} relations
   * @returns {Schema}
   */
  belongsToMany(relations) {
    return this.addRelations(relations, BELONGS_TO_MANY);
  }

  /**
   * Map has-one nested entities by attribute name.
   *
   * @param {Object} relations
   * @returns {Schema}
   */
  hasOne(relations) {
    return this.addRelations(relations, HAS_ONE);
  }

  /**
   * Map has-many nested entities by attribute name.
   *
   * @param {Object} relations
   * @returns {Schema}
   */
  hasMany(relations) {
    return this.addRelations(relations, HAS_MANY);
  }
}

Schema.BELONGS_TO = BELONGS_TO;
Schema.BELONGS_TO_MANY = BELONGS_TO_MANY;
Schema.HAS_ONE = HAS_ONE;
Schema.HAS_MANY = HAS_MANY;
