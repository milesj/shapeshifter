import Factory from './Factory';

export default class Schema {
  /**
   * Load and parse a schema, either as a JSON string, or as a JS object.
   *
   * @param {String|Object} data
   */
  constructor(data) {
    let schema = {};

    if (typeof data === 'string') {
      schema = JSON.parse(data);

    } else if (typeof data === 'object' && data) {
      schema = data;

    } else {
      throw new SyntaxError('Schema requires a valid JSON structure.');
    }

    if (!schema.name) {
      throw new Error('No name found in schema.');

    } else if (!schema.attributes || !Object.keys(schema.attributes).length) {
      throw new Error('No attributes found in schema.');
    }

    this.schema = schema;
    this.name = schema.name;
    this.constants = schema.constants || [];
    this.formats = schema.formats || [];

    // Convert attributes to definitions
    this.attributes = Object.keys(schema.attributes).map(attribute => (
      Factory.definition(attribute, schema.attributes[attribute])
    ));
  }
}
