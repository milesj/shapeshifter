import { expect } from 'chai';
import indent from '../../src/helpers/indent';

describe('helpers/indent', () => {
  it('creates an indentation based on depth', () => {
    expect(indent(1)).to.equal('  ');
    expect(indent(3)).to.equal('      ');
    expect(indent(5)).to.equal('          ');
  });

  it('can customize the spacer character', () => {
    expect(indent(1, 'x')).to.equal('x');
    expect(indent(3, 'x')).to.equal('xxx');
    expect(indent(5, 'x')).to.equal('xxxxx');
  });
});
