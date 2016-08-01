import { PropTypes } from 'react';

export const SetsBasicSchema = PropTypes.shape({
  foo: PropTypes.string,
  baz: PropTypes.bool.isRequired,
});

export const SetsWithRequiredSchema = PropTypes.shape({
  bar: PropTypes.number.isRequired,
  baz: PropTypes.bool,
  qux: PropTypes.func,
});

export const SetsWithNullSchema = PropTypes.shape({
  foo: PropTypes.string,
  qux: PropTypes.func,
});

export const SetsWithBothSchema = PropTypes.shape({
  baz: PropTypes.bool.isRequired,
  qux: PropTypes.func.isRequired,
});

export const SetsSchema = PropTypes.shape({
  foo: PropTypes.string,
  bar: PropTypes.number,
  baz: PropTypes.bool.isRequired,
  qux: PropTypes.func,
});
