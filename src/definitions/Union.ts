/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import parseOptions, { bool, string, array } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, UnionConfig } from '../types';

export default class UnionDefinition extends Definition<UnionConfig> {
  valueTypes: Definition<Config>[] = [];

  validateConfig() {
    this.config = parseOptions(
      this.config,
      {
        nullable: bool(),
        type: string('union'),
        valueTypes: array(this.createValueType())
          .notEmpty()
          .required(),
      },
      {
        name: 'UnionDefinition',
        unknown: true,
      },
    );

    this.valueTypes = this.config.valueTypes.map(
      (type, i) => DefinitionFactory.factory(this.options, `${this.attribute}_${i}`, type),
    );
  }
}
