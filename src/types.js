/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/* eslint-disable no-use-before-define */

export type Options = {
  defaultNull: boolean,
  defaultRequired: boolean,
  includeAttributes: boolean,
  includeSchemas: boolean,
  includeTypes: boolean,
  indentCharacter: string,
  renderer: string,
};

export type PrimitiveType = string | number | boolean;

// Type Definitions

export type BaseConfig = {
  null?: boolean,
  required?: boolean,
  type: string,
};

export type ArrayConfig = {
  null?: boolean,
  required?: boolean,
  type: string,
  valueType: TypeDefinition,
};

export type BoolConfig = {
  null?: boolean,
  required?: boolean,
  type: string,
};

export type EnumConfig = {
  null?: boolean,
  required?: boolean,
  type: string,
  values: PrimitiveType[],
  valueType: string,
};

export type FuncConfig = {
  argTypes?: TypeDefinition[],
  null?: boolean,
  required?: boolean,
  returnType?: TypeDefinition,
  type: string,
};

export type InstanceConfig = {
  contract: string,
  null?: boolean,
  required?: boolean,
  type: string,
};

export type NumberConfig = {
  null?: boolean,
  required?: boolean,
  type: string,
};

export type ObjectConfig = {
  keyType: TypeDefinition,
  null?: boolean,
  required?: boolean,
  type: string,
  valueType: TypeDefinition,
};

export type ReferenceConfig = {
  export?: boolean,
  null?: boolean,
  reference: string,
  relation?: string,
  required?: boolean,
  self: boolean,
  subset?: string,
  type: string,
};

export type ShapeConfig = {
  attributes: { [key: string]: TypeDefinition },
  null?: boolean,
  required?: boolean,
  type: string,
};

export type StringConfig = {
  null?: boolean,
  required?: boolean,
  type: string,
};

export type UnionConfig = {
  null?: boolean,
  required?: boolean,
  type: string,
  valueTypes: TypeDefinition[],
};

export type TypeDefinition = string |
  ArrayConfig | BoolConfig | EnumConfig | FuncConfig | InstanceConfig | NumberConfig |
  ObjectConfig | ReferenceConfig | ShapeConfig | StringConfig | UnionConfig;

// JSON Structure

export type MetadataField = {
  primaryKey?: string,
  resourceName?: string,
};

export type ConstantsField = { [key: string]: PrimitiveType | PrimitiveType[] };

export type ImportStructure = {
  default?: string,
  named?: string[],
  path: string,
};

export type ImportsField = ImportStructure[];

export type ShapesField = {
  [key: string]: {
    [key: string]: TypeDefinition,
  },
};

export type SubsetStructure = {
  attributes: string[],
  null?: { [key: string]: boolean },
  required?: { [key: string]: boolean },
};

export type SubsetsField = { [key: string]: string[] | SubsetStructure };

export type AttributesField = { [key: string]: TypeDefinition };

export type ReferencesField = { [key: string]: string };

export type SchemaStructure = {
  attributes: AttributesField,
  constants?: ConstantsField,
  imports?: ImportsField,
  meta?: MetadataField,
  name: string,
  references?: ReferencesField,
  shapes?: ShapesField,
  subsets?: SubsetsField,
};
