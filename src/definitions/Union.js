/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import Factory from '../Factory';

import type { UnionConfig } from '../types';

export default class UnionDefinition extends Definition {
  config: UnionConfig;
  valueTypes: Definition[];

  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { valueTypes } = this.config;

    if (!Array.isArray(valueTypes) || !valueTypes.length) {
      throw new SyntaxError(
        'Union definitions require a "valueTypes" property, ' +
        'which is a list of type definitions',
      );
    }

    this.valueTypes = valueTypes.map((type, i) => (
      Factory.definition(this.options, `${this.attribute}_${i}`, type)
    ));
  }
}
