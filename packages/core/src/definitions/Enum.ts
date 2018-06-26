/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable sort-keys */

import optimal, { bool, string, array, custom, Struct } from 'optimal';
import Definition from '../Definition';
import normalizeType from '../helpers/normalizeType';
import { EnumConfig } from '../types';

export default class EnumDefinition extends Definition<EnumConfig> {
  validateConfig() {
    this.config = optimal(
      this.config,
      {
        nullable: bool(),
        type: string('enum'),
        valueType: this.createUnionType(),
        // `valueType` must be validated before values
        values: array(custom(this.validateValue))
          .notEmpty()
          .required(),
      },
      {
        name: 'EnumDefinition',
        unknown: true,
      },
    );
  }

  /**
   * Validate a value matches the type in `valueType`.
   */
  validateValue(value: any, config: Struct) {
    // eslint-disable-next-line valid-typeof
    if (typeof value !== normalizeType(config.valueType)) {
      throw new TypeError('Enum values do not match the defined value type.');
    }
  }
}
