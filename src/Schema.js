/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import path from 'path';
import Factory from './Factory';
import isObject from './helpers/isObject';

export default class Schema {
  /**
   * Load and parse a schema, either as a JSON string, or as a JS object.
   *
   * @param {String} filePath
   * @param {String|Object} data
   */
  constructor(filePath, data) {
    const fileName = path.basename(filePath);
    let schema = {};
    let error = '';

    if (typeof data === 'string') {
      schema = JSON.parse(data);

    } else if (isObject(data)) {
      schema = data;

    } else {
      throw new SyntaxError(`[${fileName}] Schema requires a valid JSON structure.`);
    }

    if (!schema.name) {
      error = 'No name found in schema.';

    } else if (!isObject(schema.attributes) || !Object.keys(schema.attributes).length) {
      error = 'No attributes found in schema.';

    } else if (schema.hasOwnProperty('imports') && !Array.isArray(schema.imports)) {
      error = 'Schema imports must be an array of import declarations.';

    } else if (schema.hasOwnProperty('constants') && !isObject(schema.constants)) {
      error = 'Schema constants must be an object that maps to primitive values.';

    } else if (schema.hasOwnProperty('subsets') && !isObject(schema.subsets)) {
      error = 'Schema subsets must be an object.';

    } else if (schema.hasOwnProperty('references') && !isObject(schema.references)) {
      error = 'Schema references must be an object that maps to other schemas.';
    }

    if (error) {
      throw new SyntaxError(`[${fileName}] ${error}`);
    }

    this.schema = schema;
    this.path = filePath;
    this.name = schema.name;
    this.constants = schema.constants || {};
    this.imports = schema.imports || [];
    this.subsets = schema.subsets || {};
    this.references = schema.references || {};
    this.referenceSchemas = {};

    // Convert attributes to definitions
    this.attributes = Object.keys(schema.attributes).map(attribute => (
      Factory.definition(attribute, schema.attributes[attribute])
    ));
  }
}
