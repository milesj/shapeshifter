import optimal, { bool, string, array } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import toConfig from '../helpers/toConfig';
import { Config, Options, UnionConfig } from '../types';

export default class UnionDefinition extends Definition<UnionConfig> {
  valueTypes: Definition<Config>[] = [];

  constructor(options: Options, attribute: string, config: Partial<UnionConfig> = {}) {
    super(options, attribute, config, false);

    this.config = optimal(
      this.config,
      {
        nullable: bool(),
        optional: bool(),
        type: string('union').notEmpty(),
        valueTypes: array(this.createUnionType()).notEmpty().required(),
      },
      {
        name: 'UnionDefinition',
        unknown: true,
      },
    );

    this.valueTypes = this.config.valueTypes.map((type, i) => {
      const valueConfig = toConfig(type);

      return DefinitionFactory.factory(this.options, `${this.attribute}_${i}`, {
        ...valueConfig,
        nullable: false,
        optional: true,
      });
    });
  }
}
