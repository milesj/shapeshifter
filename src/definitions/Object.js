/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import Factory from '../Factory';

import type { Options, BaseConfig } from '../types';

export default class ObjectDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  constructor(options: Options, attribute: string, config: BaseConfig) {
    super(options, attribute, {
      keyType: 'string',
      ...config,
    });
  }

  /**
   * {@inheritDoc}
   */
  validateConfig(): void {
    super.validateConfig();

    const { keyType, valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Object definitions require a "valueType" property.');

    } else if (!keyType) {
      throw new SyntaxError('Object definitions require a "keyType" property.');

    } else if (typeof keyType !== 'string') {
      throw new TypeError(`Object key type "${keyType || 'unknown'}" not supported.`);
    }

    this.keyType = Factory.definition(this.options, `${this.attribute}_key`, keyType);
    this.valueType = Factory.definition(this.options, `${this.attribute}_value`, valueType);
  }
}
