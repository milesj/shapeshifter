/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import isPrimitive from '../helpers/isPrimitive';
import normalizeType from '../helpers/normalizeType';

import type { EnumConfig } from '../types';

export default class EnumDefinition extends Definition {
  config: EnumConfig;

  validateConfig() {
    super.validateConfig();

    const { values, valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Enum definitions require a "valueType" property.');

    } else if (!isPrimitive(valueType)) {
      throw new TypeError(`Enum value type "${valueType || 'unknown'}" not supported.`);

    } else if (!Array.isArray(values) || values.length === 0) {
      throw new TypeError('Enum values must be a non-empty array.');

    } else if (!values.every(value => this.validateValue(value))) {
      /* istanbul ignore next This is tested but Istanbul won't pick up */
      throw new TypeError('Enum values do not match the defined value type.');
    }
  }

  /**
   * Validate a value matches the type in `valueType`.
   */
  validateValue(value: mixed): boolean {
    // eslint-disable-next-line valid-typeof
    return (typeof value === normalizeType(this.config.valueType));
  }
}
