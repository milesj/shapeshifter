/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import Factory from '../Factory';

export default class ArrayDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  validateConfig(): void {
    super.validateConfig();

    const { valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Array definitions require a "valueType" property.');
    }

    this.valueType = Factory.definition(this.options, this.attribute, valueType);
  }
}
