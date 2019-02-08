import optimal, { bool, string, array } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import toConfig from '../helpers/toConfig';
import { Config, Options, PolymorphConfig } from '../types';

export default class PolymorphDefinition extends Definition<PolymorphConfig> {
  valueTypes: Definition<Config>[];

  constructor(options: Options, attribute: string, config: Partial<PolymorphConfig> = {}) {
    super(options, attribute, config, false);

    this.config = optimal(
      this.config,
      {
        export: bool(true),
        keySuffix: string('_id').notEmpty(),
        nullable: bool(),
        optional: bool(),
        type: string('polymorph').notEmpty(),
        typeSuffix: string('_type').notEmpty(),
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
      const valueConfig = toConfig(type);

      return DefinitionFactory.factory(this.options, `${this.attribute}_${i}`, {
        ...valueConfig,
        nullable: false,
      });
    });
  }
}
