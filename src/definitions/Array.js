/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';

import type { ArrayConfig } from '../types';

export default class ArrayDefinition extends Definition {
  config: ArrayConfig;
  valueType: Definition;

  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Array definitions require a "valueType" property.');
    }

    this.valueType = DefinitionFactory.factory(this.options, this.attribute, valueType);
  }
}
