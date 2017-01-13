// @flow

export type MultipleChildrenType = {
  uuid: ?string,
};

export type SingleChildType = {
  id: ?number,
  active: ?boolean,
  self: ?SingleChildType,
};

export type ParentType = {
  id: ?number,
  name: ?string,
  children: ?Array<?MultipleChildrenType>,
  orphan: ?SingleChildType,
};
