module.exports = {
  name: 'ReferenceFoo',
  references: {
    bar: './reference-bar.js',
  },
  attributes: {
    numberField: 'number',
    refField: {
      type: 'ref',
      reference: 'bar',
      nullable: false,
    },
  },
};
