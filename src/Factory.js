import ArrayDefinition from './definitions/Array';
import BoolDefinition from './definitions/Bool';
import EnumDefinition from './definitions/Enum';
import FuncDefinition from './definitions/Func';
import InstanceDefinition from './definitions/Instance';
import NumberDefinition from './definitions/Number';
import ObjectDefinition from './definitions/Object';
import ShapeDefinition from './definitions/Shape';
import StringDefinition from './definitions/String';
import UnionDefinition from './definitions/Union';
import FlowRenderer from './renderers/Flow';
import ReactRenderer from './renderers/React';
import TypeScriptRenderer from './renderers/TypeScript';
import isPrimitive from './helpers/isPrimitive';

export default class Factory {
  /**
   * Create a new definition based on the defined attribute configuration.
   *
   * @param {String} attribute
   * @param {Object} config
   * @returns {Definition}
   */
  static definition(attribute, config) {
    // Convert primitives to configuration objects
    if (typeof config === 'string') {
      if (isPrimitive(config)) {
        config = { type: config };
      } else {
        throw new TypeError(`Invalid primitive type "${config}".`);
      }
    }

    // Check if a type exists
    if (!config.type) {
      throw new SyntaxError('Definitions require a "type" property.');
    }

    // Instantiate definition classes
    switch (config.type) {
      case 'array':
        return new ArrayDefinition(attribute, config);

      case 'bool':
      case 'boolean':
        config.type = 'boolean';
        return new BoolDefinition(attribute, config);

      case 'enum':
        return new EnumDefinition(attribute, config);

      case 'func':
      case 'function':
        config.type = 'function';
        return new FuncDefinition(attribute, config);

      case 'inst':
      case 'instance':
        config.type = 'instance';
        return new InstanceDefinition(attribute, config);

      case 'int':
      case 'integer':
      case 'number':
        config.type = 'number';
        return new NumberDefinition(attribute, config);

      case 'obj':
      case 'object':
        config.type = 'object';
        return new ObjectDefinition(attribute, config);

      case 'struct':
      case 'shape':
        config.type = 'shape';
        return new ShapeDefinition(attribute, config);

      case 'str':
      case 'string':
        config.type = 'string';
        return new StringDefinition(attribute, config);

      case 'union':
        return new UnionDefinition(attribute, config);

      default:
        throw new TypeError(`Type "${config.type || 'unknown'}" not supported.`);
    }
  }

  /**
   * Create a new renderer with the defined schema.
   *
   * @param {String} renderer
   * @param {Schema} schema
   * @returns {Renderer}
   */
  static renderer(renderer, schema) {
    switch (renderer) {
      case 'react':
        return new ReactRenderer(schema);

      case 'flow':
        return new FlowRenderer(schema);

      case 'ts':
      case 'typescript':
        return new TypeScriptRenderer(schema);

      default:
        throw new Error(`Renderer "${renderer || 'unknown'}" not supported.`);
    }
  }
}
