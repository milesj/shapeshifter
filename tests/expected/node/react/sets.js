import PropTypes from 'prop-types';

export const SetsBasicShape = PropTypes.shape({
  foo: PropTypes.string,
  baz: PropTypes.bool.isRequired,
});

export const SetsWithNullShape = PropTypes.shape({
  foo: PropTypes.string.isRequired,
  qux: PropTypes.string,
});

export const SetsShape = PropTypes.shape({
  foo: PropTypes.string,
  bar: PropTypes.number,
  baz: PropTypes.bool.isRequired,
  qux: PropTypes.string.isRequired,
});
