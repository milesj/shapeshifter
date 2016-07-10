import { PropTypes } from 'react';

export const ReferenceBarSchema = PropTypes.shape({
  boolField: PropTypes.bool,
});

export const ReferenceFooSchema = PropTypes.shape({
  numberField: PropTypes.number,
  refField: ReferenceBarSchema.isRequired,
});

export const ReferenceSchema = PropTypes.shape({
  stringField: PropTypes.string,
  refField: ReferenceFooSchema,
  referenceField: ReferenceFooSchema,
});
