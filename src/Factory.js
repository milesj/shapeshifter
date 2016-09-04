/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import ArrayDefinition from './definitions/Array';
import BoolDefinition from './definitions/Bool';
import EnumDefinition from './definitions/Enum';
import FuncDefinition from './definitions/Func';
import InstanceDefinition from './definitions/Instance';
import NumberDefinition from './definitions/Number';
import ObjectDefinition from './definitions/Object';
import ReferenceDefinition from './definitions/Reference';
import ShapeDefinition from './definitions/Shape';
import StringDefinition from './definitions/String';
import UnionDefinition from './definitions/Union';
import FlowRenderer from './renderers/Flow';
import ReactRenderer from './renderers/React';
import TypeScriptRenderer from './renderers/TypeScript';
import isPrimitive from './helpers/isPrimitive';
import normalizeType from './helpers/normalizeType';

export default class Factory {
  /**
   * Create a new definition based on the defined attribute configuration.
   *
   * @param {Object} options
   * @param {String} attribute
   * @param {Object} config
   * @returns {Definition}
   */
  static definition(options, attribute, config) {
    // Convert primitives to configuration objects
    if (typeof config === 'string') {
      if (isPrimitive(normalizeType(config))) {
        config = { type: config };
      } else {
        throw new TypeError(`Invalid primitive type "${config}".`);
      }
    }

    // Check if a type exists
    if (!config.type) {
      throw new SyntaxError('Definitions require a "type" property.');
    } else {
      config.type = normalizeType(config.type);
    }

    // Instantiate definition classes
    switch (config.type) {
      case 'array':
        return new ArrayDefinition(options, attribute, config);

      case 'boolean':
        return new BoolDefinition(options, attribute, config);

      case 'enum':
        return new EnumDefinition(options, attribute, config);

      case 'function':
        return new FuncDefinition(options, attribute, config);

      case 'instance':
        return new InstanceDefinition(options, attribute, config);

      case 'number':
        return new NumberDefinition(options, attribute, config);

      case 'object':
        return new ObjectDefinition(options, attribute, config);

      case 'shape':
        return new ShapeDefinition(options, attribute, config);

      case 'string':
        return new StringDefinition(options, attribute, config);

      case 'union':
        return new UnionDefinition(options, attribute, config);

      case 'reference':
        return new ReferenceDefinition(options, attribute, config);

      default:
        throw new TypeError(`Type "${config.type || 'unknown'}" not supported.`);
    }
  }

  /**
   * Create a new renderer with the defined schema.
   *
   * @param {Object} options
   * @param {SchemaReader} [schema]
   * @returns {Renderer}
   */
  static renderer(options, schema) {
    const { renderer } = options;

    switch (renderer.toLowerCase()) {
      case 'react':
        return new ReactRenderer(options, schema);

      case 'flow':
        return new FlowRenderer(options, schema);

      case 'typescript':
        return new TypeScriptRenderer(options, schema);

      default:
        throw new Error(`Renderer "${renderer || 'unknown'}" not supported.`);
    }
  }
}
