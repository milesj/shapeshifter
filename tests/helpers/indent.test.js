import { expect } from 'chai';
import config from '../../lib/config';
import indent from '../../lib/helpers/indent';

describe('helpers/indent', () => {
  it('creates an indentation based on depth', () => {
    expect(indent(1)).to.equal('  ');
    expect(indent(3)).to.equal('      ');
    expect(indent(5)).to.equal('          ');
  });

  it('inherits the indent character from the config', () => {
    const oldChar = config.indentCharacter;
    config.indentCharacter = 'x';

    expect(indent(1)).to.equal('x');
    expect(indent(3)).to.equal('xxx');
    expect(indent(5)).to.equal('xxxxx');

    config.indentCharacter = oldChar;
  });
});
