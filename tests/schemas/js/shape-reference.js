module.exports = {
  name: 'ShapeReference',
  shapes: {
    price: {
      amount: 'number',
      nativeAmount: 'number',
      exchangeRate: 'number',
    },
  },
  attributes: {
    fees: {
      type: 'shape',
      reference: 'price',
    },
    taxes: {
      type: 'shape',
      reference: 'price',
      nullable: true,
    },
    total: {
      type: 'shape',
      reference: 'price',
      nullable: true,
    },
  },
};
