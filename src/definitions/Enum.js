/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config from 'optimal';
import Definition from '../Definition';
import normalizeType from '../helpers/normalizeType';

import type { EnumConfig } from '../types';

export default class EnumDefinition extends Definition {
  config: EnumConfig;

  validateConfig() {
    this.config = new Config(this.config, opt => ({
      nullable: opt.bool(),
      type: opt.string('enum'),
      valueType: this.createValueType(opt),
      values: opt.array(opt.custom(this.validateValue)).notEmpty().required(),
    }), {
      name: 'EnumDefinition',
      unknown: true,
    });
  }

  /**
   * Validate a value matches the type in `valueType`.
   */
  validateValue(value: *, options: Object) {
    // eslint-disable-next-line valid-typeof
    if (typeof value !== normalizeType(options.valueType)) {
      throw new TypeError('Enum values do not match the defined value type.');
    }
  }
}
