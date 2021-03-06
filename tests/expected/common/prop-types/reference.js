/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

import PropTypes from 'prop-types';

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
  refField: ReferenceBarShape,
});

export const ReferenceShape = PropTypes.shape({
  stringField: PropTypes.string,
  refField: ReferenceFooShape,
  referenceField: ReferenceFooShape,
  subsetRefField: ReferenceSetOnlyStringShape,
});
