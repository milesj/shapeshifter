/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string, array } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import toConfig from '../helpers/toConfig';
import { Config, PolymorphConfig } from '../types';

export default class PolymorphDefinition extends Definition<PolymorphConfig> {
  // @ts-ignore Set after instantiation
  valueTypes: Definition<Config>[];

  validateConfig() {
    this.config = optimal(
      this.config,
      {
        keySuffix: string('_id'),
        nullable: bool(),
        type: string('polymorph'),
        typeSuffix: string('_type'),
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
      const config = toConfig(type);

      return DefinitionFactory.factory(this.options, `${this.attribute}_${i}`, {
        ...config,
        nullable: false,
      });
    });
  }
}
