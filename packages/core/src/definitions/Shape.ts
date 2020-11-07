import optimal, { bool, string, object } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, Options, ShapeConfig } from '../types';

export default class ShapeDefinition extends Definition<ShapeConfig> {
  attributes: Definition<Config>[] = [];

  constructor(options: Options, attribute: string, config: Partial<ShapeConfig> = {}) {
    super(options, attribute, config, false);

    // @ts-expect-error
    this.config = optimal(
      this.config,
      {
        // @ts-expect-error
        attributes: object(this.createUnionType(), null)
          .xor('reference')
          .notEmpty()
          .nullable(),
        nullable: bool(),
        optional: bool(),
        reference: string().xor('attributes'),
        type: string('shape').notEmpty(),
      },
      {
        name: 'ShapeDefinition',
        unknown: true,
      },
    );

    const { attributes } = this.config;

    if (attributes) {
      this.attributes = Object.keys(attributes).map(attr =>
        DefinitionFactory.factory(this.options, attr, attributes[attr]),
      );
    }
  }
}
