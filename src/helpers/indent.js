import config from '../config';

/**
 * Create a string that represents indentation using the defined depth.
 *
 * @param {Number} depth
 * @returns {String}
 */
export default function indent(depth) {
  let response = '';

  while (depth > 0) {
    response += config.indentCharacter;
    depth--;
  }

  return response;
}
