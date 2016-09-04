/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

const HAS_ONE = 'one';
const HAS_MANY = 'many';

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
  }

  /**
   * Map a list of attribute names.
   *
   * @param {String[]} attributes
   */
  addAttributes(attributes) {
    this.attributes = this.attributes.concat(attributes);
  }

  /**
   * Map a one/many relational schema to the current schema.
   *
   * @param {String} attribute
   * @param {Schema} schema
   * @param {String} relation
   */
  addRelation(attribute, schema, relation) {
    this.relations.push({
      attribute,
      schema,
      relation,
    });

    if (this.attributes.indexOf(attribute) === -1) {
      this.attributes.push(attribute);
    }
  }

  /**
   * @see hasOne
   */
  belongsTo(relations) {
    return this.hasOne(relations);
  }

  /**
   * @see hasMany
   */
  belongsToMany(relations) {
    return this.hasMany(relations);
  }

  /**
   * Map has-one nested entities by attribute name.
   *
   * @param {Object} relations
   */
  hasOne(relations) {
    Object.keys(relations).forEach((attribute) => {
      const schema = relations[attribute];

      if (schema instanceof Schema) {
        this.addRelation(attribute, schema, HAS_ONE);
      } else {
        throw new Error(`One relation "${attribute}" is not a valid schema.`);
      }
    });

    return this;
  }

  /**
   * Map has-many nested entities by attribute name.
   *
   * @param {Object} relations
   */
  hasMany(relations) {
    Object.keys(relations).forEach((attribute) => {
      const schema = relations[attribute];

      if (schema instanceof Schema) {
        this.addRelation(attribute, schema, HAS_MANY);
      } else {
        throw new Error(`Many relation "${attribute}" is not a valid schema.`);
      }
    });

    return this;
  }
}

Schema.HAS_ONE = HAS_ONE;
Schema.HAS_MANY = HAS_MANY;
