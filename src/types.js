/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

export type Options = {
  defaultNull: boolean,
  defaultRequired: boolean,
  indentCharacter: string,
  renderer: string,
  includeSchemas: boolean,
  includeAttributes: boolean,
  includeTypes: boolean,
};

export type PrimitiveType = string | number | boolean;

// Type Definitions

export type BaseConfig = {
  type: string,
  null?: boolean,
  required?: boolean,
};

export type ArrayConfig = {
  type: string,
  valueType: TypeDefinition,
  null?: boolean,
  required?: boolean,
};

export type BoolConfig = {
  type: string,
  null?: boolean,
  required?: boolean,
};

export type EnumConfig = {
  type: string,
  valueType: string,
  values: PrimitiveType[],
  null?: boolean,
  required?: boolean,
};

export type FuncConfig = {
  type: string,
  returnType?: TypeDefinition,
  argTypes?: TypeDefinition[],
  null?: boolean,
  required?: boolean,
};

export type InstanceConfig = {
  type: string,
  contract: string,
  null?: boolean,
  required?: boolean,
};

export type NumberConfig = {
  type: string,
  null?: boolean,
  required?: boolean,
};

export type ObjectConfig = {
  type: string,
  keyType: TypeDefinition,
  valueType: TypeDefinition,
  null?: boolean,
  required?: boolean,
};

export type ReferenceConfig = {
  type: string,
  reference: string,
  self: boolean,
  subset?: string,
  relation?: string,
  export?: boolean,
  null?: boolean,
  required?: boolean,
};

export type ShapeConfig = {
  type: string,
  attributes: { [key: string]: TypeDefinition },
  null?: boolean,
  required?: boolean,
};

export type StringConfig = {
  type: string,
  null?: boolean,
  required?: boolean,
};

export type UnionConfig = {
  type: string,
  valueTypes: TypeDefinition[],
  null?: boolean,
  required?: boolean,
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

export type SubsetStructure = {
  attributes: string[],
  null?: { [key: string]: boolean },
  required?: { [key: string]: boolean },
};

export type SubsetsField = { [key: string]: string[] | SubsetStructure };

export type AttributesField = { [key: string]: TypeDefinition };

export type ReferencesField = { [key: string]: string };

export type SchemaStructure = {
  name: string,
  attributes: AttributesField,
  meta?: MetadataField,
  constants?: ConstantsField,
  imports?: ImportsField,
  subsets?: SubsetsField,
  references?: ReferencesField,
};
