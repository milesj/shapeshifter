/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Schema from './Schema';
import { Relation } from './types';

export default function morph(schema: Schema | Schema[]): Relation {
  if (Array.isArray(schema)) {
    return {
      attribute: '',
      collection: true,
      relation: Schema.MORPH_TO_MANY,
      schema: schema[0],
    };
  }

  return {
    attribute: '',
    collection: false,
    relation: Schema.MORPH_TO,
    schema,
  };
}
