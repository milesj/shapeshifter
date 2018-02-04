/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config, { bool, string } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';

import type { ObjectConfig } from '../types';

export default class ObjectDefinition extends Definition {
  config: ObjectConfig;

  keyType: Definition;

  valueType: Definition;

  validateConfig() {
    this.config = new Config(
      this.config,
      {
        keyType: string('string'),
        nullable: bool(),
        type: string('object'),
        valueType: this.createValueType(),
      },
      {
        name: 'ObjectDefinition',
        unknown: true,
      },
    );

    this.keyType = DefinitionFactory.factory(this.options, `${this.attribute}_key`, {
      nullable: false,
      type: this.config.keyType,
    });

    this.valueType = DefinitionFactory.factory(
      this.options,
      `${this.attribute}_value`,
      this.config.valueType,
    );
  }
}
