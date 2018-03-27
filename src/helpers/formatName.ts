/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/**
 * Format a name by converting to pascal case.
 */
export default function formatName(value: string): string {
  if (!value) {
    return '';
  }

  const name = value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\W+(.)/g, match => match.charAt(1).toUpperCase())
    .trim();

  return name.charAt(0).toUpperCase() + name.slice(1);
}
