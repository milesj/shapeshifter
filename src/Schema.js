import Factory from './Factory';
import isObject from './helpers/isObject';

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

    } else if (isObject(data)) {
      schema = data;

    } else {
      throw new SyntaxError('Schema requires a valid JSON structure.');
    }

    if (!schema.name) {
      throw new SyntaxError('No name found in schema.');

    } else if (!isObject(schema.attributes) || !Object.keys(schema.attributes).length) {
      throw new SyntaxError('No attributes found in schema.');

    } else if (schema.hasOwnProperty('imports') && !Array.isArray(schema.imports)) {
      throw new SyntaxError('Schema imports must be an array of import declarations.');

    } else if (schema.hasOwnProperty('constants') && !isObject(schema.constants)) {
      throw new SyntaxError('Schema constants must be an object that maps to primitive values.');
    }

    this.schema = schema;
    this.name = schema.name;
    this.constants = schema.constants || {};
    this.imports = schema.imports || [];
    this.formats = schema.formats || [];

    // Convert attributes to definitions
    this.attributes = Object.keys(schema.attributes).map(attribute => (
      Factory.definition(attribute, schema.attributes[attribute])
    ));
  }
}
