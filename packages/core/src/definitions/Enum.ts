/* eslint-disable sort-keys */

import optimal, { bool, string, array, custom, Schema } from 'optimal';
import Definition from '../Definition';
import normalizeType from '../helpers/normalizeType';
import { Options, EnumConfig } from '../types';

export default class EnumDefinition extends Definition<EnumConfig> {
  constructor(options: Options, attribute: string, config: Partial<EnumConfig> = {}) {
    super(options, attribute, config, false);

    this.config = optimal(
      this.config,
      {
        constant: bool(),
        nullable: bool(),
        optional: bool(),
        type: string('enum').notEmpty(),
        valueType: this.createUnionType(),
        // `valueType` must be validated before values
        values: array(custom(this.validateValue, ''))
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
  validateValue(value: unknown, schema: Schema<EnumConfig>) {
    const cfg = schema.struct;

    if (cfg.constant) {
      return;
    }

    // eslint-disable-next-line valid-typeof
    if (typeof value !== normalizeType(cfg.valueType)) {
      throw new TypeError('Enum values do not match the defined value type.');
    }
  }
}
