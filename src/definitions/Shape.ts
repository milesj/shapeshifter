/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import parseOptions, { bool, string, object } from 'optimal';
import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import { Config, ShapeConfig } from '../types';

export default class ShapeDefinition extends Definition<ShapeConfig> {
  attributes: Definition<Config>[] = [];

  validateConfig() {
    this.config = parseOptions(
      this.config,
      {
        attributes: object(this.createValueType(), null)
          .nullable()
          .xor('reference')
          .notEmpty(),
        nullable: bool(),
        reference: string()
          .xor('attributes')
          .empty(),
        type: string('shape'),
      },
      {
        name: 'ShapeDefinition',
        unknown: true,
      },
    );

    const { attributes } = this.config;

    if (attributes) {
      this.attributes = Object.keys(attributes).map(
        attribute => DefinitionFactory.factory(this.options, attribute, attributes[attribute]),
      );
    }
  }
}
