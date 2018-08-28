const FOO = 1;
const BAR = 2;
const BAZ = 3;

module.exports = {
  name: 'Enums',
  constants: {
    FOO,
    BAR,
    BAZ,
  },
  attributes: {
    consts: {
      type: 'enum',
      valueType: 'number',
      values: ['FOO', 'BAR', BAZ, 4],
      constant: true,
    },
  },
};
