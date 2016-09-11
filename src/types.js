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

export type BaseConfig = {
  null: boolean,
  required: boolean,
};

export type PrimitiveType = string | number | boolean;

export type TypeDefinition = {
  type: string,
  null?: boolean,
  required?: boolean,

  // References
  reference?: string,
  self?: boolean,
  export?: boolean,
  subset?: string,
};

export type MetadataField = { [key: string]: string };

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

export type AttributesField = { [key: string]: string | TypeDefinition };

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
