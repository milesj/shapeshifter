/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, ArrayConfig } from '../types';

export default class ArrayDefinition extends Definition<ArrayConfig> {
  valueType: Definition<Config> | null = null;

  validateConfig() {
    this.config = optimal(
      this.config,
      {
        nullable: bool(),
        type: string('array'),
        valueType: this.createUnionType(),
      },
      {
        name: 'ArrayDefinition',
        unknown: true,
      },
    );

    this.valueType = DefinitionFactory.factory(this.options, this.attribute, this.config.valueType);
  }
}
