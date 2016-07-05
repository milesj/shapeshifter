/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Definition from '../Definition';
import isPrimitive from '../helpers/isPrimitive';
import normalizeType from '../helpers/normalizeType';

export default class EnumDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { values, valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Enum definitions require a "valueType" property.');

    } else if (!isPrimitive(valueType)) {
      throw new TypeError(`Enum value type "${valueType || 'unknown'}" not supported.`);

    } else if (!Array.isArray(values) || !values.length) {
      throw new TypeError('Enum values must be a non-empty array.');

    } else if (!values.every(value => this.validateValue(value))) {
      throw new TypeError('Enum values do not match the defined value type.');
    }
  }

  /**
   * Validate a value matches the type in `valueType`.
   *
   * @param {*} value
   * @returns {Boolean}
   */
  validateValue(value) {
    let valueType = normalizeType(this.config.valueType);

    // Function names are defined as strings within the schema
    if (valueType === 'function') {
      valueType = 'string';
    }

    return (typeof value === valueType);
  }
}
