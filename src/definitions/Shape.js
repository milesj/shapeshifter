/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import Factory from '../Factory';
import isObject from '../helpers/isObject';

import type { ShapeConfig } from '../types';

export default class ShapeDefinition extends Definition {
  config: ShapeConfig;
  attributes: Definition[];

  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { attributes } = this.config;

    if (!isObject(attributes) || !Object.keys(attributes).length) {
      throw new SyntaxError(
        'Shape definitions require an "attributes" property, ' +
        'which is an object mapping of attributes to type definitions.'
      );
    }

    this.attributes = Object.keys(attributes).map(attribute => (
      Factory.definition(this.options, attribute, attributes[attribute])
    ));
  }
}
