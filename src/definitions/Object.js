/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Definition from '../Definition';
import Factory from '../Factory';

export default class ObjectDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  constructor(attribute, config) {
    super(attribute, {
      keyType: 'string',
      ...config,
    });
  }

  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { keyType, valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Object definitions require a "valueType" property.');

    } else if (!keyType) {
      throw new SyntaxError('Object definitions require a "keyType" property.');

    } else if (typeof keyType !== 'string') {
      throw new TypeError(`Object key type "${keyType || 'unknown'}" not supported.`);
    }

    this.keyType = Factory.definition(`${this.attribute}_key`, keyType);
    this.valueType = Factory.definition(`${this.attribute}_value`, valueType);
  }
}
