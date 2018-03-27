/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, ObjectConfig } from '../types';

export default class ObjectDefinition extends Definition<ObjectConfig> {
  keyType: Definition<Config> | null = null;

  valueType: Definition<Config> | null = null;

  validateConfig() {
    this.config = optimal(
      this.config,
      {
        keyType: this.createUnionType(false),
        nullable: bool(),
        type: string('object'),
        valueType: this.createUnionType(),
      },
      {
        name: 'ObjectDefinition',
        unknown: true,
      },
    );

    this.keyType = DefinitionFactory.factory(
      this.options,
      `${this.attribute}_key`,
      this.config.keyType || 'string',
    );

    this.valueType = DefinitionFactory.factory(
      this.options,
      `${this.attribute}_value`,
      this.config.valueType,
    );
  }
}
