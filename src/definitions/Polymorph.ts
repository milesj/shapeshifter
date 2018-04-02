/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string, array } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, PolymorphConfig } from '../types';

export default class PolymorphDefinition extends Definition<PolymorphConfig> {
  // @ts-ignore Set after instantiation
  valueTypes: Definition<Config>[];

  validateConfig() {
    this.config = optimal(
      this.config,
      {
        nullable: bool(),
        type: string('polymorph'),
        valueTypes: array(this.createUnionType())
          .notEmpty()
          .required(),
      },
      {
        name: 'PolymorphDefinition',
        unknown: true,
      },
    );

    this.valueTypes = this.config.valueTypes.map((type, i) => {
      const config = typeof type === 'string' ? { type } : type;

      return DefinitionFactory.factory(this.options, `${this.attribute}_${i}`, {
        ...config,
        nullable: false,
      });
    });
  }
}
