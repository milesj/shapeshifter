/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config from 'optimal';
import normalizeType from './helpers/normalizeType';

import type { Builders, UnionBuilder } from 'optimal'; // eslint-disable-line
import type { Options } from './types';

export default class Definition {
  options: Options;
  attribute: string;
  config: Object;

  /**
   * Represents a type definition for an attribute.
   */
  constructor(options: Options, attribute: string, config: Object = {}) {
    this.options = options;
    this.attribute = attribute;
    this.config = {
      nullable: options.defaultNullable,
      ...config,
    };

    this.validateConfig();
  }

  /**
   * Create an option for our `valueType` type definition.
   */
  createValueType(builders: Builders): UnionBuilder {
    const { shape, string, union } = builders;

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
    return this.config.nullable;
  }

  /**
   * Validate the definition configuration.
   */
  validateConfig() {
    const { name } = this.constructor;

    this.config = new Config(this.config, opt => ({
      nullable: opt.bool(),
      type: opt.string(normalizeType(name.toLowerCase())),
    }), {
      name: name || 'Definition',
      unknown: true,
    });
  }
}
