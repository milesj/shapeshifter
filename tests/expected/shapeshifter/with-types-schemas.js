// @flow
import Schema from 'shapeshifter';

export const MultipleChildrenSchema = new Schema('multiple-children', 'uuid');

export const SingleChildSchema = new Schema('single-child');

SingleChildSchema
  .hasOne({
    self: SingleChildSchema,
  });

export const ParentSchema = new Schema('parents');

ParentSchema
  .hasOne({
    orphan: SingleChildSchema,
  })
  .hasMany({
    children: MultipleChildrenSchema,
  });

export type MultipleChildrenType = {
  uuid: string,
};

export type SingleChildType = {
  id: number,
  active: boolean,
  self: SingleChildType,
};

export type ParentType = {
  id: number,
  name: string,
  children: Array<MultipleChildrenType>,
  orphan: SingleChildType,
};
