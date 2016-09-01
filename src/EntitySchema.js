/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

export default class EntitySchema {
  /**
   * Represents a schema for an entity.
   */
  constructor() {
    this.primaryKey = 'id';
    this.attributes = [];
    this.relations = {};
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
   * Map nested entities by attribute name.
   *
   * @param {Object} relations
   */
  addRelations(relations) {
    Object.keys(relations).forEach((attribute) => {
      const schema = relations[attribute];

      if (schema instanceof EntitySchema) {
        this.relations[attribute] = schema;
        this.attributes.push(attribute);
      } else {
        throw new Error(`Relation "${attribute}" is not an entity schema.`);
      }
    });
  }
}
