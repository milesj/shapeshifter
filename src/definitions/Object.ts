/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import parseOptions, { bool, string } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, ObjectConfig } from '../types';

export default class ObjectDefinition extends Definition<ObjectConfig> {
  keyType: Definition<Config> | null = null;

  valueType: Definition<Config> | null = null;

  validateConfig() {
    this.config = parseOptions(
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

    this.keyType = DefinitionFactory.factory(
      this.options,
      `${this.attribute}_key`,
      this.config.keyType,
    );

    this.valueType = DefinitionFactory.factory(
      this.options,
      `${this.attribute}_value`,
      this.config.valueType,
    );
  }
}
