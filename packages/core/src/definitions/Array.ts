/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, Options, ArrayConfig } from '../types';

export default class ArrayDefinition extends Definition<ArrayConfig> {
  valueType: Definition<Config>;

  constructor(options: Options, attribute: string, config: Partial<ArrayConfig> = {}) {
    super(options, attribute, config, false);

    this.config = optimal(
      this.config,
      {
        nullable: bool(),
        optional: bool(),
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
