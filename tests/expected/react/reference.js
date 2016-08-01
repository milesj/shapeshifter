import { PropTypes } from 'react';

export const ReferenceBarSchema = PropTypes.shape({
  boolField: PropTypes.bool,
});

export const ReferenceSetOnlyStringSchema = PropTypes.shape({
  stringField: PropTypes.string,
});

export const ReferenceSetSchema = PropTypes.shape({
  boolField: PropTypes.bool,
  stringField: PropTypes.string,
  numberField: PropTypes.number,
});

export const ReferenceFooSchema = PropTypes.shape({
  numberField: PropTypes.number,
  refField: ReferenceBarSchema.isRequired,
});

export const ReferenceSchema = PropTypes.shape({
  stringField: PropTypes.string,
  refField: ReferenceFooSchema,
  referenceField: ReferenceFooSchema,
  subsetRefField: ReferenceSetOnlyStringSchema,
});
