/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Definition from '../Definition';
import UnionDefinition from './Union';
import { KeyConfig } from '../types';

export default class KeyDefinition extends Definition<KeyConfig> {
  // @ts-ignore Set after instantiation
  keyType: UnionDefinition;

  validateConfig() {
    super.validateConfig();

    this.keyType = new UnionDefinition(this.options, `${this.attribute}_key`, {
      nullable: false,
      optional: true, // Prop types
      valueTypes: ['string', 'number'],
    });
  }
}
