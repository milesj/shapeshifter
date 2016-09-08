// @flow
import Schema from 'shapeshifter';

export const MultipleChildrenSchema = new Schema('multiple-children', 'uuid');

MultipleChildrenSchema
  .addAttributes([
    'uuid',
  ]);

export const SingleChildSchema = new Schema('single-child');

SingleChildSchema
  .addAttributes([
    'id',
    'active',
    'self',
  ])
  .hasOne({
    self: SingleChildSchema,
  });

export const ParentSchema = new Schema('parents');

ParentSchema
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
