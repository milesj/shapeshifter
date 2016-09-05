// @flow

export type MultipleChildrenType = {
  uuid: string,
};

export type SingleChildType = {
  id: number,
  active: boolean,
};

export type ParentType = {
  id: number,
  name: string,
  children: Array<MultipleChildrenType>,
  orphan: SingleChildType,
};
