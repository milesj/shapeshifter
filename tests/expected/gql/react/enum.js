import { PropTypes } from 'react';

export const EnumShape = PropTypes.shape({
  firstField: PropTypes.oneOf([
    0,
    1,
    2,
    3,
  ]),
  secondField: PropTypes.oneOf([
    0,
    1,
    2,
    3,
  ]),
  thirdField: PropTypes.oneOf([
    0,
    1,
    2,
    3,
  ]),
});
