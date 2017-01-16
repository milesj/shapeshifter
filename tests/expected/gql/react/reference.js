import { PropTypes } from 'react';

export const ReferenceBarShape = PropTypes.shape({
  boolField: PropTypes.bool,
});

export const ReferenceFooShape = PropTypes.shape({
  numberField: PropTypes.number,
  refField: ReferenceBarShape.isRequired,
});

export const ReferenceShape = PropTypes.shape({
  stringField: PropTypes.string,
  refField: ReferenceFooShape.isRequired,
  referenceField: ReferenceFooShape,
});
