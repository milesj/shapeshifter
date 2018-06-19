/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable typescript/no-empty-interface */

import { Struct } from 'optimal';
import Schema from './Schema';

export type PrimitiveType = string | number | boolean;

export type RendererType = 'flow' | 'prop-types' | 'typescript';

export interface Options extends Struct {
  defaultNullable: boolean;
  disableEslint: boolean;
  importPath: string;
  includeAttributes: boolean;
  includeDefinitions: boolean;
  includeSchemas: boolean;
  indentCharacter: string;
  inferPropTypesShape: boolean;
  renderers: RendererType[];
  stripPropTypes: boolean;
  useDefine: boolean;
}

export interface SchemaMap {
  [attribute: string]: Schema;
}

export interface DefineRelationMap {
  [attribute: string]: Schema | Schema[];
}

export interface Relation {
  attribute: string;
  collection: boolean;
  polymorph?: PolymorphRelation;
  relation: string;
  schema: Schema;
}

export interface PolymorphRelation {
  keySuffix: string;
  type: string;
  typeSuffix: string;
}

export type PrimaryKey = string | string[];

// Type Definitions

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

export interface KeyConfig extends Config {}

export interface NumberConfig extends Config {}

export interface ObjectConfig extends Config {
  keyType?: TypeDefinition;
  valueType: TypeDefinition;
}

export interface PolymorphConfig extends Config {
  export?: boolean;
  keySuffix?: string;
  typeSuffix?: string;
  valueTypes: (TypeDefinition & { name: string })[];
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
