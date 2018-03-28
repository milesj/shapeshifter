/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable complexity */

import ArrayDefinition from './definitions/Array';
import BoolDefinition from './definitions/Bool';
import Definition from './Definition';
import EnumDefinition from './definitions/Enum';
import InstanceDefinition from './definitions/Instance';
import isPrimitive from './helpers/isPrimitive';
import NumberDefinition from './definitions/Number';
import normalizeType from './helpers/normalizeType';
import ObjectDefinition from './definitions/Object';
import ReferenceDefinition from './definitions/Reference';
import ShapeDefinition from './definitions/Shape';
import StringDefinition from './definitions/String';
import UnionDefinition from './definitions/Union';
import { Config, TypeDefinition, Options } from './types';

export default class DefinitionFactory {
  /**
   * Create a new definition based on the defined attribute configuration.
   */
  static factory(
    options: Options,
    attribute: string,
    baseConfig: TypeDefinition,
  ): Definition<Config> {
    let config = { type: '' };

    // Convert primitives to configuration objects
    if (typeof baseConfig === 'string') {
      if (isPrimitive(normalizeType(baseConfig))) {
        config.type = baseConfig;
      } else {
        throw new TypeError(`Invalid primitive type "${baseConfig}".`);
      }
    } else {
      config = baseConfig;
    }

    // Check if a type exists
    if (config.type) {
      config.type = normalizeType(config.type);
    } else {
      throw new SyntaxError('Definitions require a "type" property.');
    }

    // Instantiate definition classes
    switch (config.type) {
      case 'array':
        return new ArrayDefinition(options, attribute, config);

      case 'boolean':
        return new BoolDefinition(options, attribute, config);

      case 'enum':
        return new EnumDefinition(options, attribute, config);

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
