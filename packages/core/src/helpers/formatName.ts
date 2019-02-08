/**
 * Format a name by converting to pascal case.
 */
export default function formatName(value: string): string {
  if (!value) {
    return '';
  }

  const name = value
    .replace(/[^a-zA-Z0-9]+/gu, ' ')
    .replace(/\W+(.)/gu, match => match.charAt(1).toUpperCase())
    .trim();

  return name.charAt(0).toUpperCase() + name.slice(1);
}
