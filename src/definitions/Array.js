/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config, { bool, string } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';

import type { ArrayConfig } from '../types';

export default class ArrayDefinition extends Definition {
  config: ArrayConfig;
  valueType: Definition;

  validateConfig() {
    this.config = new Config(this.config, {
      nullable: bool(),
      type: string('array'),
      valueType: this.createValueType(),
    }, {
      name: 'ArrayDefinition',
      unknown: true,
    });

    this.valueType = DefinitionFactory.factory(
      this.options,
      this.attribute,
      this.config.valueType,
    );
  }
}
