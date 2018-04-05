/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, ObjectConfig, StringConfig } from '../types';

export default class ObjectDefinition extends Definition<ObjectConfig> {
  keyType?: Definition<Config>;

  valueType?: Definition<Config>;

  validateConfig() {
    this.config = optimal(
      this.config,
      {
        keyType: string('string'),
        nullable: bool(),
        type: string('object'),
        valueType: this.createUnionType(),
      },
      {
        name: 'ObjectDefinition',
        unknown: true,
      },
    );

    this.keyType = DefinitionFactory.factory(this.options, `${this.attribute}_key`, {
      nullable: false,
      type: this.config.keyType,
    } as StringConfig);

    this.valueType = DefinitionFactory.factory(
      this.options,
      `${this.attribute}_value`,
      this.config.valueType,
    );
  }
}
