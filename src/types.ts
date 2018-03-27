/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { Struct } from 'optimal';

export interface Options extends Struct {
  defaultNullable: boolean;
  disableEslint: boolean;
  importPath: string;
  includeAttributes: boolean;
  includeSchemas: boolean;
  includeTypes: boolean;
  indentCharacter: string;
  renderer: 'react' | 'flow' | 'typescript';
  stripPropTypes: boolean;
  useDefine: boolean;
}

export type PrimitiveType = string | number | boolean;

// Type Definitions

export interface Config extends Struct {
  nullable?: boolean;
  type: string;
}

export interface ArrayConfig extends Config {
  valueType: TypeDefinition;
}

export interface BoolConfig extends Config {}

export interface EnumConfig extends Config {
  values: PrimitiveType[];
  valueType: string;
}

export interface InstanceConfig extends Config {
  contract: string;
}

export interface NumberConfig extends Config {}

export interface ObjectConfig extends Config {
  keyType?: TypeDefinition;
  valueType: TypeDefinition;
}

export interface ReferenceConfig extends Config {
  export?: boolean;
  reference: string;
  relation?: string;
  self?: boolean;
  subset?: string;
}

export interface ShapeConfig extends Config {
  attributes: {
    [key: string]: TypeDefinition;
  };
  reference?: string;
}

export interface StringConfig extends Config {}

export interface UnionConfig extends Config {
  valueTypes: TypeDefinition[];
}

export type TypeDefinition =
  | string
  | ArrayConfig
  | BoolConfig
  | EnumConfig
  | InstanceConfig
  | NumberConfig
  | ObjectConfig
  | ReferenceConfig
  | ShapeConfig
  | StringConfig
  | UnionConfig;

// JSON Structure

export interface MetadataField {
  primaryKey?: string;
  resourceName?: string;
}

export interface ConstantsField {
  [key: string]: PrimitiveType | PrimitiveType[];
}

export interface ImportStructure {
  default?: string;
  named?: string[];
  path: string;
}

export type ImportsField = ImportStructure[];

export interface ShapesField {
  [key: string]: {
    [key: string]: TypeDefinition;
  };
}

export interface SubsetStructure {
  attributes: string[];
  nullable?: { [key: string]: boolean };
}

export interface SubsetsField {
  [key: string]: string[] | SubsetStructure;
}

export interface AttributesField {
  [key: string]: TypeDefinition;
}

export interface ReferencesField {
  [key: string]: string;
}

export interface SchemaStructure {
  attributes: AttributesField;
  constants?: ConstantsField;
  imports?: ImportsField;
  meta?: MetadataField;
  name: string;
  references?: ReferencesField;
  shapes?: ShapesField;
  subsets?: SubsetsField;
}

// Helpers

export type Partial<T> = { [P in keyof T]?: T[P] };
