/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Schema from './Schema';
import { Relation } from './types';

export default function morph(
  schema: Schema | Schema[],
  typeSuffix: string = '_type',
  keySuffix: string = '_id',
): Relation {
  if (Array.isArray(schema)) {
    return {
      attribute: '',
      collection: true,
      keySuffix,
      relation: Schema.MORPH_TO_MANY,
      schema: schema[0],
      typeSuffix,
    };
  }

  return {
    attribute: '',
    collection: false,
    keySuffix,
    relation: Schema.MORPH_TO,
    schema,
    typeSuffix,
  };
}
