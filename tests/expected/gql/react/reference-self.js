import { PropTypes } from 'react';

export const ReferenceSelfShape = PropTypes.shape({
  stringField: PropTypes.string,
  referenceField: (...args) => ReferenceSelfShape(...args),
  requiredRefField: (...args) => ReferenceSelfShape(...args).isRequired,
});
