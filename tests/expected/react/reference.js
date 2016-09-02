import { PropTypes } from 'react';

export const ReferenceBarShape = PropTypes.shape({
  boolField: PropTypes.bool,
});

export const ReferenceSetOnlyStringShape = PropTypes.shape({
  stringField: PropTypes.string,
});

export const ReferenceSetShape = PropTypes.shape({
  boolField: PropTypes.bool,
  stringField: PropTypes.string,
  numberField: PropTypes.number,
});

export const ReferenceFooShape = PropTypes.shape({
  numberField: PropTypes.number,
  refField: ReferenceBarShape.isRequired,
});

export const ReferenceShape = PropTypes.shape({
  stringField: PropTypes.string,
  refField: ReferenceFooShape,
  referenceField: ReferenceFooShape,
  subsetRefField: ReferenceSetOnlyStringShape,
});
