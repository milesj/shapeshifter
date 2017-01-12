/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from './Definition';
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
import isPrimitive from './helpers/isPrimitive';
import normalizeType from './helpers/normalizeType';

import type { Options, BaseConfig } from './types';

export default class DefinitionFactory {
  /**
   * Create a new definition based on the defined attribute configuration.
   *
   * @param {Object} options
   * @param {String} attribute
   * @param {Object} config
   * @returns {Definition}
   */
  static factory(options: Options, attribute: string, config: string | BaseConfig): Definition {
    // Convert primitives to configuration objects
    if (typeof config === 'string') {
      if (isPrimitive(normalizeType(config))) {
        config = ({ type: config }: BaseConfig);
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
}
