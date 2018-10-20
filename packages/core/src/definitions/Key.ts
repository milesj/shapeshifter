/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Definition from '../Definition';
import UnionDefinition from './Union';
import { Options, KeyConfig } from '../types';

export default class KeyDefinition extends Definition<KeyConfig> {
  keyType: UnionDefinition;

  constructor(options: Options, attribute: string, config: Partial<KeyConfig> = {}) {
    super(options, attribute, config);

    this.keyType = new UnionDefinition(this.options, `${this.attribute}_key`, {
      nullable: false,
      optional: true, // Prop types
      valueTypes: ['string', 'number'],
    });
  }
}
