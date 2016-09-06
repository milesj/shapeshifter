// @flow
import Schema from 'shapeshifter';

export const MultipleChildrenSchema = new Schema('multiple-children', 'uuid');

export const SingleChildSchema = new Schema('single-child');

export const ParentSchema = new Schema('parents')
  .hasOne({
    orphan: SingleChildSchema,
  })
  .hasMany({
    children: MultipleChildrenSchema,
  });
