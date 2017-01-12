import formatName from '../../src/helpers/formatName';

describe('helpers/formatName', () => {
  it('camel cases the name', () => {
    expect(formatName(' Some Random NamedEnum  ')).toBe('SomeRandomNamedEnum');
  });
});
