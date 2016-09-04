/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

export default class Relation {
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Return the schema.
   *
   * @returns {Schema}
   */
  getSchema() {
    return this.schema;
  }
}
