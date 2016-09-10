// @flow
import Schema from 'shapeshifter';

export const MultipleChildrenSchema = new Schema('multiple-children', 'uuid');

export const SingleChildSchema = new Schema('single-child');

export const ParentSchema = new Schema('parents');

SingleChildSchema.hasOne({
  self: SingleChildSchema,
});

ParentSchema.hasOne({
  orphan: SingleChildSchema,
}).belongsToMany({
  children: MultipleChildrenSchema,
});
