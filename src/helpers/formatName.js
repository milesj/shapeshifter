/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/**
 * Format a name by converting to pascal case.
 *
 * @param {String} value
 * @returns {String}
 */
export default function formatName(value: string): string {
  if (!value) {
    return '';
  }

  value = value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\W+(.)/g, match => match[1].toUpperCase())
    .trim();

  return value.charAt(0).toUpperCase() + value.slice(1);
}
