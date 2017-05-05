/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/**
 * Create a string that represents indentation using the defined depth.
 */
export default function indent(startingDepth: number, character: string = '  '): string {
  let response = '';
  let depth = startingDepth;

  while (depth > 0) {
    response += character;
    depth -= 1;
  }

  return response;
}
