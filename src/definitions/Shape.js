/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';
import isObject from '../helpers/isObject';

import type { ShapeConfig } from '../types';

export default class ShapeDefinition extends Definition {
  config: ShapeConfig;
  attributes: Definition[];

  validateConfig() {
    super.validateConfig();

    const { attributes, reference } = this.config;

    if (reference) {
      if (typeof reference !== 'string') {
        throw new TypeError('Shape reference must be a string.');
      }
    } else if (attributes) {
      if (!isObject(attributes) || Object.keys(attributes).length === 0) {
        throw new TypeError('Shape attributes must be a mapping of type definitions.');
      }

      this.attributes = Object.keys(attributes).map(attribute => (
        DefinitionFactory.factory(this.options, attribute, attributes[attribute])
      ));
    } else {
      throw new SyntaxError('Shape definitions require an "attributes" or "reference" property.');
    }
  }
}
