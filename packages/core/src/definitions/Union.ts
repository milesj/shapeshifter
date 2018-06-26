/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string, array } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import toConfig from '../helpers/toConfig';
import { Config, UnionConfig } from '../types';

export default class UnionDefinition extends Definition<UnionConfig> {
  // @ts-ignore Set after instantiation
  valueTypes: Definition<Config>[];

  validateConfig() {
    this.config = optimal(
      this.config,
      {
        nullable: bool(),
        optional: bool(),
        type: string('union'),
        valueTypes: array(this.createUnionType())
          .notEmpty()
          .required(),
      },
      {
        name: 'UnionDefinition',
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
