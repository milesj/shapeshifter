import config from '../config';

export default function indent(depth) {
  let response = '';

  while (depth > 0) {
    response += config.indentCharacter;
    depth--;
  }

  return response;
}
