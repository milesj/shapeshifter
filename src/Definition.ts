/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import parseOptions, { bool, string, shape, union, UnionBuilder } from 'optimal';
import normalizeType from './helpers/normalizeType';
import { Config, Options } from './types';

export default class Definition<T extends Config> {
  options: Options;

  attribute: string;

  config: T;

  /**
   * Represents a type definition for an attribute.
   */
  constructor(options: Options, attribute: string, config: T) {
    this.options = options;
    this.attribute = attribute;
    this.config = {
      nullable: options.defaultNullable,
      // @ts-ignore
      ...config,
    };

    this.validateConfig();
  }

  /**
   * Create an option for our `valueType` type definition.
   */
  createValueType(): UnionBuilder {
    return union([
      string(),
      shape({
        type: string().required(),
      }),
    ]).required();
  }

  /**
   * Returns true if the attribute allows nulls.
   */
  isNullable(): boolean {
    return this.config.nullable || false;
  }

  /**
   * Validate the definition configuration.
   */
  validateConfig() {
    const { name } = this.constructor;

    this.config = parseOptions(this.config, {
      nullable: bool(),
      type: string(normalizeType(name.toLowerCase())),
    }, {
      name: name || 'Definition',
      unknown: true,
    });
  }
}
