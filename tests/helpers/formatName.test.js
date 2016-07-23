import { expect } from 'chai';
import formatName from '../../lib/helpers/formatName';

describe('helpers/formatName', () => {
  it('camel cases the name', () => {
    expect(formatName(' Some Random NamedEnum  ')).to.equal('SomeRandomNamedEnum');
  });
});
