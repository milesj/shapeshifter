/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import path from 'path';
import Definition from './Definition';
import DefinitionFactory from './DefinitionFactory';
import isObject from './helpers/isObject';
import {
  AttributesField,
  ConstantsField,
  ImportsField,
  MetadataField,
  Options,
  ReferencesField,
  SchemaStructure,
  ShapesField,
  SubsetsField,
} from './types';

export default class Schematic {
  data: SchemaStructure;

  path: string;

  name: string;

  options: Options;

  metadata: MetadataField;

  attributes: Definition<any>[];

  constants: ConstantsField;

  imports: ImportsField;

  shapes: ShapesField;

  subsets: SubsetsField;

  references: ReferencesField;

  referenceSchematics: { [key: string]: Schematic };

  /**
   * Load and parse a schema, either as a JSON string, or as a JS object.
   */
  constructor(filePath: string, data: SchemaStructure, options: Options) {
    this.path = filePath;
    this.name = path.basename(filePath);
    this.data = data;
    this.options = options;
    this.metadata = {};
    this.attributes = [];
    this.constants = {};
    this.imports = [];
    this.shapes = {};
    this.subsets = {};
    this.references = {};
    this.referenceSchematics = {};

    this.setup();
  }

  /**
   * Throw an error prefixed with the schema name.
   */
  throwError(error: string) {
    throw new SyntaxError(`[${this.name}] ${error}`);
  }

  /**
   * Setup the state of the schema.
   */
  setup() {
    const { data } = this;

    this.setName(data.name);
    this.setAttributes(data.attributes);

    if (typeof data.meta !== 'undefined') {
      this.setMeta(data.meta);
    }

    if (typeof data.constants !== 'undefined') {
      this.setConstants(data.constants);
    }

    if (typeof data.imports !== 'undefined') {
      this.setImports(data.imports);
    }

    if (typeof data.references !== 'undefined') {
      this.setReferences(data.references);
    }

    if (typeof data.shapes !== 'undefined') {
      this.setShapes(data.shapes);
    }

    if (typeof data.subsets !== 'undefined') {
      this.setSubsets(data.subsets);
    }
  }

  /**
   * Set schema attributes.
   */
  setAttributes(attributes: AttributesField) {
    if (!isObject(attributes) || Object.keys(attributes).length === 0) {
      this.throwError('No attributes found in schema.');
    }

    // Convert to type definitions
    this.attributes = Object.keys(attributes).map(attribute => (
      // @ts-ignore
      DefinitionFactory.factory(this.options, attribute, attributes[attribute])
    ));
  }

  /**
   * Set schema constants.
   */
  setConstants(constants: ConstantsField) {
    if (!isObject(constants)) {
      this.throwError('Schema constants must be an object that maps to primitive values.');
    }

    this.constants = constants;
  }

  /**
   * Set schema imports.
   */
  setImports(imports: ImportsField) {
    if (!Array.isArray(imports)) {
      this.throwError('Schema imports must be an array of import declarations.');
    }

    this.imports = imports;
  }

  /**
   * Set schema metadata.
   */
  setMeta(metadata: MetadataField) {
    if (!isObject(metadata)) {
      this.throwError('Schema metadata must be an object of strings.');
    }

    this.metadata = metadata;
  }

  /**
   * Set the name of the schema.
   */
  setName(name: string) {
    if (!name || typeof name !== 'string') {
      this.throwError('No name found in schema.');
    }

    this.name = name;
  }

  /**
   * Set reference schemas.
   */
  setReferences(references: ReferencesField) {
    if (!isObject(references)) {
      this.throwError('Schema references must be an object that maps to other schemas.');
    }

    this.references = references;
  }

  /**
   * Set shapes for the schema.
   */
  setShapes(shapes: ShapesField) {
    if (!isObject(shapes)) {
      this.throwError('Schema shapes must be an object.');
    }

    this.shapes = shapes;
  }

  /**
   * Set subsets of the schema.
   */
  setSubsets(subsets: SubsetsField) {
    if (!isObject(subsets)) {
      this.throwError('Schema subsets must be an object.');
    }

    this.subsets = subsets;
  }
}
