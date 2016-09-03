/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import path from 'path';
import Factory from './Factory';
import isObject from './helpers/isObject';

export default class SchemaReader {
  /**
   * Load and parse a schema, either as a JSON string, or as a JS object.
   *
   * @param {String} filePath
   * @param {String|Object} data
   */
  constructor(filePath, data) {
    this.path = filePath;
    this.name = path.basename(filePath);
    this.attributes = {};
    this.constants = {};
    this.imports = [];
    this.subsets = {};
    this.references = {};
    this.referenceSchemas = {};

    if (typeof data === 'string') {
      this.schema = JSON.parse(data);
    } else if (isObject(data)) {
      this.schema = data;
    } else {
      this.throwError('Schema requires a valid JSON structure.');
    }

    this.setup();
  }

  /**
   * Throw an error prefixed with the schema name.
   *
   * @param {String} error
   */
  throwError(error) {
    throw new SyntaxError(`[${this.name}] ${error}`);
  }

  /**
   * Setup the state of the schema.
   */
  setup() {
    const data = this.schema;

    this.setName(data.name);
    this.setAttributes(data.attributes);

    if ('constants' in data) {
      this.setConstants(data.constants);
    }

    if ('imports' in data) {
      this.setImports(data.imports);
    }

    if ('references' in data) {
      this.setReferences(data.references);
    }

    if ('subsets' in data) {
      this.setSubsets(data.subsets);
    }
  }

  /**
   * Set schema attributes.
   *
   * @param {Object} attributes
   */
  setAttributes(attributes) {
    if (!isObject(attributes) || !Object.keys(attributes).length) {
      this.throwError('No attributes found in schema.');
    }

    // Convert to type definitions
    this.attributes = Object.keys(attributes).map(attribute => (
      Factory.definition(attribute, attributes[attribute])
    ));
  }

  /**
   * Set schema constants.
   *
   * @param {Object} constants
   */
  setConstants(constants) {
    if (!isObject(constants)) {
      this.throwError('Schema constants must be an object that maps to primitive values.');
    }

    this.constants = constants;
  }

  /**
   * Set schema imports.
   *
   * @param {Object[]} imports
   */
  setImports(imports) {
    if (!Array.isArray(imports)) {
      this.throwError('Schema imports must be an array of import declarations.');
    }

    this.imports = imports;
  }

  /**
   * Set the name of the schema.
   *
   * @param {String} name
   */
  setName(name) {
    if (!name || typeof name !== 'string') {
      this.throwError('No name found in schema.');
    }

    this.name = name;
  }

  /**
   * Set reference schemas.
   *
   * @param {Object} references
   */
  setReferences(references) {
    if (!isObject(references)) {
      this.throwError('Schema references must be an object that maps to other schemas.');
    }

    this.references = references;
  }

  /**
   * Set subsets of the schema.
   *
   * @param {Object} subsets
   */
  setSubsets(subsets) {
    if (!isObject(subsets)) {
      this.throwError('Schema subsets must be an object.');
    }

    this.subsets = subsets;
  }
}
