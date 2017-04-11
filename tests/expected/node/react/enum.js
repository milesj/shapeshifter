import PropTypes from 'prop-types';

export const EnumShape = PropTypes.shape({
  boolField: PropTypes.oneOf([
    true,
    false,
  ]),
  booleanField: PropTypes.oneOf([
    false,
    true,
  ]),
  intField: PropTypes.oneOf([
    123,
  ]),
  integerField: PropTypes.oneOf([
    1,
    2,
    3,
  ]),
  numField: PropTypes.oneOf([
    123,
    456,
    789,
  ]),
  numberField: PropTypes.oneOf([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]),
  floatField: PropTypes.oneOf([
    12.34,
    56.78,
    9,
    65.4,
  ]),
  strField: PropTypes.oneOf([
    'foo',
    'bar',
  ]),
  stringField: PropTypes.oneOf([
    'baz',
    'qux',
  ]),
});
