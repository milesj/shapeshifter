// @flow
import Schema from 'shapeshifter';

export const MultipleChildrenSchema = new Schema('multiple-children', 'uuid')
  .addAttributes([
    'uuid',
  ]);

export const SingleChildSchema = new Schema('single-child', 'id')
  .addAttributes([
    'id',
    'active',
  ]);

export const ParentSchema = new Schema('parents', 'id')
  .addAttributes([
    'id',
    'name',
    'children',
    'orphan',
  ])
  .hasOne({
    orphan: SingleChildSchema,
  })
  .hasMany({
    children: MultipleChildrenSchema,
  });
