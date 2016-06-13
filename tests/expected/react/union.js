import { PropTypes } from 'react';
import UnionNamespace, { UnionClassName } from '/path/to/UnionClassName';

export const UnionSchema = PropTypes.shape({
  arrayField: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  ]),
  primitiveFields: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.func,
  ]),
  enumField: PropTypes.oneOfType([
    PropTypes.oneOf([
      'foo',
      'bar',
      'baz',
    ]),
    PropTypes.oneOf([
      789,
      456,
      123,
    ]),
  ]),
  instanceField: PropTypes.oneOfType([
    PropTypes.instanceOf(UnionClassName),
    PropTypes.instanceOf(UnionNamespace.UnionClassName),
  ]),
  objectField: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.number),
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  shapeField: PropTypes.oneOfType([
    PropTypes.shape({
      foo: PropTypes.string,
      bar: PropTypes.bool,
      baz: PropTypes.func.isRequired,
    }),
    PropTypes.shape({
      qux: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]),
    }),
  ]),
  unionField: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([
        1,
        2,
        3,
      ]),
    ]),
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
  ]),
});
