import { PropTypes } from 'react';

export const ReferenceSelfBasicSchema = PropTypes.shape({
  stringField: PropTypes.string,
});

export const ReferenceSelfSchema = PropTypes.shape({
  stringField: PropTypes.string,
  referenceField: (...args) => ReferenceSelfSchema(...args),
  requiredRefField: (...args) => ReferenceSelfSchema(...args).isRequired,
  subsetRefField: PropTypes.arrayOf(ReferenceSelfBasicSchema),
});
