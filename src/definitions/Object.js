/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';

import type { ObjectConfig } from '../types';

export default class ObjectDefinition extends Definition {
  config: ObjectConfig;
  keyType: Definition;
  valueType: Definition;

  validateConfig() {
    this.config = new Config(this.config, opt => ({
      nullable: opt.bool(),
      keyType: opt.string('string'),
      type: opt.string('object'),
      valueType: this.createValueType(opt),
    }), {
      name: 'ObjectDefinition',
      unknown: true,
    });

    this.keyType = DefinitionFactory.factory(this.options, `${this.attribute}_key`, {
      type: this.config.keyType,
      nullable: false,
    });

    this.valueType = DefinitionFactory.factory(
      this.options,
      `${this.attribute}_value`,
      this.config.valueType,
    );
  }
}
