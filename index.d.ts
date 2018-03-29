declare module 'shapeshifter/lib/helpers/isObject' {
  export default function isObject<T>(value: T): boolean;

}
declare module 'shapeshifter/lib/helpers/normalizeType' {
  export default function normalizeType(baseType: any): string;

}
declare module 'shapeshifter/lib/Schema' {
  import { PrimaryKey, Relation, SchemaMap, SchemaExpandedMap, MetadataField } from 'shapeshifter/lib/types';
  export default class Schema {
      static HAS_ONE: string;
      static HAS_MANY: string;
      static BELONGS_TO: string;
      static BELONGS_TO_MANY: string;
      attributes: string[];
      metadata: MetadataField;
      primaryKey: PrimaryKey;
      relations: Relation[];
      relationTypes: {
          [key: string]: string;
      };
      resourceName: string;
      constructor(resourceName: string, primaryKey?: PrimaryKey | MetadataField, metadata?: MetadataField);
      addAttributes(attributes: string[]): this;
      addRelation(attribute: string, schema: Schema, relation: string): this;
      addRelations(schemas: SchemaMap, relation: string): this;
      belongsTo(relations: SchemaMap): this;
      belongsToMany(relations: SchemaMap): this;
      define(relations: SchemaExpandedMap): this;
      hasOne(relations: SchemaMap): this;
      hasMany(relations: SchemaMap): this;
  }

}
declare module 'shapeshifter/lib/types' {
  import { Struct } from 'optimal';
  import Schema from 'shapeshifter/lib/Schema';
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
  export interface SchemaMap {
      [attribute: string]: Schema;
  }
  export interface SchemaExpandedMap {
      [attribute: string]: Schema | Schema[];
  }
  export interface Relation {
      attribute: string;
      collection: boolean;
      relation: string;
      schema: Schema;
  }
  export type PrimaryKey = string | string[];
  export type TypeDefinition = string | ArrayConfig | BoolConfig | EnumConfig | InstanceConfig | NumberConfig | ObjectConfig | ReferenceConfig | ShapeConfig | StringConfig | UnionConfig;
  export interface Config extends Struct {
      nullable?: boolean;
      type: string;
  }
  export interface ArrayConfig extends Config {
      valueType: TypeDefinition;
  }
  export interface BoolConfig extends Config {
  }
  export interface EnumConfig extends Config {
      values: PrimitiveType[];
      valueType: string;
  }
  export interface InstanceConfig extends Config {
      contract: string;
  }
  export interface NumberConfig extends Config {
  }
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
  export interface StringConfig extends Config {
  }
  export interface UnionConfig extends Config {
      valueTypes: TypeDefinition[];
  }
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
      nullable?: {
          [key: string]: boolean;
      };
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

}
declare module 'shapeshifter/lib/Definition' {
  import { UnionBuilder } from 'optimal';
  import { Config, Options } from 'shapeshifter/lib/types';
  export default class Definition<T extends Config> {
      options: Options;
      attribute: string;
      config: T;
      constructor(options: Options, attribute: string, config: Partial<T>);
      createUnionType(defaultValue?: any): UnionBuilder;
      isNullable(): boolean;
      validateConfig(): void;
  }

}
declare module 'shapeshifter/lib/definitions/Array' {
  import Definition from 'shapeshifter/lib/Definition';
  import { Config, ArrayConfig } from 'shapeshifter/lib/types';
  export default class ArrayDefinition extends Definition<ArrayConfig> {
      valueType?: Definition<Config>;
      validateConfig(): void;
  }

}
declare module 'shapeshifter/lib/definitions/Bool' {
  import Definition from 'shapeshifter/lib/Definition';
  import { BoolConfig } from 'shapeshifter/lib/types';
  export default class BoolDefinition extends Definition<BoolConfig> {
  }

}
declare module 'shapeshifter/lib/definitions/Enum' {
  import { Struct } from 'optimal';
  import Definition from 'shapeshifter/lib/Definition';
  import { EnumConfig } from 'shapeshifter/lib/types';
  export default class EnumDefinition extends Definition<EnumConfig> {
      validateConfig(): void;
      validateValue(value: any, config: Struct): void;
  }

}
declare module 'shapeshifter/lib/definitions/Instance' {
  import Definition from 'shapeshifter/lib/Definition';
  import { InstanceConfig } from 'shapeshifter/lib/types';
  export default class InstanceDefinition extends Definition<InstanceConfig> {
      validateConfig(): void;
  }

}
declare module 'shapeshifter/lib/helpers/isPrimitive' {
  export default function isPrimitive(value: string): boolean;

}
declare module 'shapeshifter/lib/definitions/Number' {
  import Definition from 'shapeshifter/lib/Definition';
  import { NumberConfig } from 'shapeshifter/lib/types';
  export default class NumberDefinition extends Definition<NumberConfig> {
  }

}
declare module 'shapeshifter/lib/definitions/Object' {
  import Definition from 'shapeshifter/lib/Definition';
  import { Config, ObjectConfig } from 'shapeshifter/lib/types';
  export default class ObjectDefinition extends Definition<ObjectConfig> {
      keyType?: Definition<Config>;
      valueType?: Definition<Config>;
      validateConfig(): void;
  }

}
declare module 'shapeshifter/lib/definitions/Reference' {
  import Definition from 'shapeshifter/lib/Definition';
  import { ReferenceConfig } from 'shapeshifter/lib/types';
  export default class ReferenceDefinition extends Definition<ReferenceConfig> {
      validateConfig(): void;
  }

}
declare module 'shapeshifter/lib/definitions/Shape' {
  import Definition from 'shapeshifter/lib/Definition';
  import { Config, ShapeConfig } from 'shapeshifter/lib/types';
  export default class ShapeDefinition extends Definition<ShapeConfig> {
      attributes?: Definition<Config>[];
      validateConfig(): void;
  }

}
declare module 'shapeshifter/lib/definitions/String' {
  import Definition from 'shapeshifter/lib/Definition';
  import { StringConfig } from 'shapeshifter/lib/types';
  export default class StringDefinition extends Definition<StringConfig> {
  }

}
declare module 'shapeshifter/lib/definitions/Union' {
  import Definition from 'shapeshifter/lib/Definition';
  import { Config, UnionConfig } from 'shapeshifter/lib/types';
  export default class UnionDefinition extends Definition<UnionConfig> {
      valueTypes: Definition<Config>[];
      validateConfig(): void;
  }

}
declare module 'shapeshifter/lib/DefinitionFactory' {
  import Definition from 'shapeshifter/lib/Definition';
  import { Config, TypeDefinition, Options } from 'shapeshifter/lib/types';
  export default class DefinitionFactory {
      static factory(options: Options, attribute: string, baseConfig: TypeDefinition): Definition<Config>;
  }

}
declare module 'shapeshifter/lib/Schematic' {
  import Definition from 'shapeshifter/lib/Definition';
  import { AttributesField, ConstantsField, ImportsField, MetadataField, Options, ReferencesField, SchemaStructure, ShapesField, SubsetsField } from 'shapeshifter/lib/types';
  export default class Schematic {
      data: SchemaStructure;
      path: string;
      name: string;
      options: Options;
      metadata: MetadataField;
      attributes: Definition<any>[];
      constants: ConstantsField;
      imports: ImportsField;
      shapes: ShapesField;
      subsets: SubsetsField;
      references: ReferencesField;
      referenceSchematics: {
          [key: string]: Schematic;
      };
      constructor(filePath: string, data: SchemaStructure, options: Options);
      throwError(error: string): void;
      setup(): void;
      setAttributes(attributes: AttributesField): void;
      setConstants(constants: ConstantsField): void;
      setImports(imports: ImportsField): void;
      setMeta(metadata: MetadataField): void;
      setName(name: string): void;
      setReferences(references: ReferencesField): void;
      setShapes(shapes: ShapesField): void;
      setSubsets(subsets: SubsetsField): void;
  }

}
declare module 'shapeshifter/lib/helpers/indent' {
  export default function indent(startingDepth: number, character?: string): string;

}
declare module 'shapeshifter/lib/helpers/formatName' {
  export default function formatName(value: string): string;

}
declare module 'shapeshifter/lib/Renderer' {
  import { Struct } from 'optimal';
  import Definition from 'shapeshifter/lib/Definition';
  import Schematic from 'shapeshifter/lib/Schematic';
  import ArrayDefinition from 'shapeshifter/lib/definitions/Array';
  import BoolDefinition from 'shapeshifter/lib/definitions/Bool';
  import EnumDefinition from 'shapeshifter/lib/definitions/Enum';
  import InstanceDefinition from 'shapeshifter/lib/definitions/Instance';
  import NumberDefinition from 'shapeshifter/lib/definitions/Number';
  import ObjectDefinition from 'shapeshifter/lib/definitions/Object';
  import ReferenceDefinition from 'shapeshifter/lib/definitions/Reference';
  import ShapeDefinition from 'shapeshifter/lib/definitions/Shape';
  import StringDefinition from 'shapeshifter/lib/definitions/String';
  import UnionDefinition from 'shapeshifter/lib/definitions/Union';
  import { Config, ImportStructure, MetadataField, Options, PrimitiveType } from 'shapeshifter/lib/types';
  export type TemplateList = string[];
  export default class Renderer {
      options: Options;
      schematic: Schematic;
      suffix: string;
      imports: TemplateList;
      constants: TemplateList;
      header: TemplateList;
      sets: TemplateList;
      schemas: TemplateList;
      relations: TemplateList;
      constructor(options: Options, schematic: Schematic);
      afterParse(): void;
      beforeParse(): void;
      formatArray(items: string | string[], depth: number, itemSpacer?: string, indentSpacer?: string): string;
      formatObject(props: string | string[], depth: number, propSpacer?: string, indentSpacer?: string): string;
      formatValue(value: any, type?: string): string;
      getConstants(): TemplateList;
      getHeader(): TemplateList;
      getImports(): TemplateList;
      getObjectName(...names: string[]): string;
      getRelations(): TemplateList;
      getSchemas(): TemplateList;
      getSchemaInstanceName(name: string): string;
      getSets(): TemplateList;
      parse(): void;
      parseConstants(): void;
      parseImports(): void;
      parseReferences(): void;
      parseSchemas(): void;
      parseSets(): void;
      parseShapes(): void;
      render(setName: string, attributes?: Definition<Config>[]): string;
      renderAttribute(definition: Definition<Config>, depth?: number): string;
      renderArray(definition: ArrayDefinition, depth: number): string;
      renderArrayItems(items: PrimitiveType[], depth?: number, valueType?: string): string[];
      renderArrayDefinitions(items: Definition<Config>[], depth?: number): string[];
      renderBool(definition: BoolDefinition): string;
      renderConstant(name: string, value: PrimitiveType | PrimitiveType[]): string;
      renderEnum(definition: EnumDefinition, depth: number): string;
      renderImport(statement: ImportStructure): string;
      renderInstance(definition: InstanceDefinition): string;
      renderNumber(definition: NumberDefinition): string;
      renderObject(definition: ObjectDefinition, depth: number): string;
      renderObjectProps(props: Definition<Config>[], depth?: number, sep?: string): string[];
      renderOrFormat(value: PrimitiveType | Definition<Config>, depth: number, valueType?: string): string;
      renderPlainObject(object: Struct, depth?: number): string;
      renderReference(definition: ReferenceDefinition): string;
      renderSchema(name: string, attributes: Definition<Config>[] | undefined, metadata: MetadataField): string;
      renderShape(definition: ShapeDefinition, depth: number): string;
      renderShapeReference(definition: ShapeDefinition): string;
      renderString(definition: StringDefinition): string;
      renderUnion(definition: UnionDefinition, depth: number): string;
      unsupported(definition: string): string;
      wrapFunction(name: string, args?: string): string;
      wrapGenerics(alias: string, ...types: string[]): string;
      wrapIIFE(code: string): string;
      wrapItem(value: string, depth?: number): string;
      wrapProperty(key: string, value: string, depth?: number, sep?: string): string;
      wrapPropertyName(definition: Definition<Config>): string;
  }

}
declare module 'shapeshifter/lib/renderers/Flow' {
  import Renderer from 'shapeshifter/lib/Renderer';
  import Schematic from 'shapeshifter/lib/Schematic';
  import Definition from 'shapeshifter/lib/Definition';
  import ArrayDefinition from 'shapeshifter/lib/definitions/Array';
  import BoolDefinition from 'shapeshifter/lib/definitions/Bool';
  import EnumDefinition from 'shapeshifter/lib/definitions/Enum';
  import InstanceDefinition from 'shapeshifter/lib/definitions/Instance';
  import NumberDefinition from 'shapeshifter/lib/definitions/Number';
  import ObjectDefinition from 'shapeshifter/lib/definitions/Object';
  import ReferenceDefinition from 'shapeshifter/lib/definitions/Reference';
  import ShapeDefinition from 'shapeshifter/lib/definitions/Shape';
  import StringDefinition from 'shapeshifter/lib/definitions/String';
  import UnionDefinition from 'shapeshifter/lib/definitions/Union';
  import { Config, Options } from 'shapeshifter/lib/types';
  export default class FlowRenderer extends Renderer {
      constructor(options: Options, schematic: Schematic);
      afterParse(): void;
      render(setName: string, attributes?: Definition<Config>[]): string;
      renderArray(definition: ArrayDefinition, depth: number): string;
      renderBool(definition: BoolDefinition): string;
      renderEnum(definition: EnumDefinition, depth: number): string;
      renderInstance(definition: InstanceDefinition): string;
      renderNumber(definition: NumberDefinition): string;
      renderObject(definition: ObjectDefinition, depth: number): string;
      renderReference(definition: ReferenceDefinition): string;
      renderShape(definition: ShapeDefinition, depth: number): string;
      renderString(definition: StringDefinition): string;
      renderUnion(definition: UnionDefinition, depth: number): string;
      wrapNullable(definition: Definition<Config>, template: string): string;
  }

}
declare module 'shapeshifter/lib/renderers/React' {
  import Renderer from 'shapeshifter/lib/Renderer';
  import Schematic from 'shapeshifter/lib/Schematic';
  import Definition from 'shapeshifter/lib/Definition';
  import ArrayDefinition from 'shapeshifter/lib/definitions/Array';
  import BoolDefinition from 'shapeshifter/lib/definitions/Bool';
  import EnumDefinition from 'shapeshifter/lib/definitions/Enum';
  import InstanceDefinition from 'shapeshifter/lib/definitions/Instance';
  import NumberDefinition from 'shapeshifter/lib/definitions/Number';
  import ObjectDefinition from 'shapeshifter/lib/definitions/Object';
  import ReferenceDefinition from 'shapeshifter/lib/definitions/Reference';
  import ShapeDefinition from 'shapeshifter/lib/definitions/Shape';
  import StringDefinition from 'shapeshifter/lib/definitions/String';
  import UnionDefinition from 'shapeshifter/lib/definitions/Union';
  import { Config, Options } from 'shapeshifter/lib/types';
  export default class ReactRenderer extends Renderer {
      constructor(options: Options, schematic: Schematic);
      beforeParse(): void;
      render(setName: string, attributes?: Definition<Config>[]): string;
      renderArray(definition: ArrayDefinition, depth: number): string;
      renderBool(definition: BoolDefinition): string;
      renderEnum(definition: EnumDefinition, depth: number): string;
      renderInstance(definition: InstanceDefinition): string;
      renderNumber(definition: NumberDefinition): string;
      renderObject(definition: ObjectDefinition, depth: number): string;
      renderReference(definition: ReferenceDefinition): string;
      renderShape(definition: ShapeDefinition, depth: number): string;
      renderString(definition: StringDefinition): string;
      renderUnion(definition: UnionDefinition, depth: number): string;
      wrapPropType(definition: Definition<Config>, template: string): string;
      wrapNullable(definition: Definition<Config>, template: string): string;
  }

}
declare module 'shapeshifter/lib/renderers/TypeScript' {
  import Renderer from 'shapeshifter/lib/Renderer';
  import Schematic from 'shapeshifter/lib/Schematic';
  import Definition from 'shapeshifter/lib/Definition';
  import ArrayDefinition from 'shapeshifter/lib/definitions/Array';
  import BoolDefinition from 'shapeshifter/lib/definitions/Bool';
  import EnumDefinition from 'shapeshifter/lib/definitions/Enum';
  import InstanceDefinition from 'shapeshifter/lib/definitions/Instance';
  import NumberDefinition from 'shapeshifter/lib/definitions/Number';
  import ObjectDefinition from 'shapeshifter/lib/definitions/Object';
  import ShapeDefinition from 'shapeshifter/lib/definitions/Shape';
  import StringDefinition from 'shapeshifter/lib/definitions/String';
  import UnionDefinition from 'shapeshifter/lib/definitions/Union';
  import { Config, Options } from 'shapeshifter/lib/types';
  export default class TypeScriptRenderer extends Renderer {
      constructor(options: Options, schematic: Schematic);
      render(setName: string, attributes?: Definition<Config>[]): string;
      renderArray(definition: ArrayDefinition, depth: number): string;
      renderBool(definition: BoolDefinition): string;
      renderEnum(definition: EnumDefinition, depth: number): string;
      renderInstance(definition: InstanceDefinition): string;
      renderNumber(definition: NumberDefinition): string;
      renderObject(definition: ObjectDefinition, depth: number): string;
      renderShape(definition: ShapeDefinition, depth: number): string;
      renderString(definition: StringDefinition): string;
      renderUnion(definition: UnionDefinition, depth: number): string;
  }

}
declare module 'shapeshifter/lib/RendererFactory' {
  import Schematic from 'shapeshifter/lib/Schematic';
  import Renderer from 'shapeshifter/lib/Renderer';
  import { Options } from 'shapeshifter/lib/types';
  export default class RendererFactory {
      static factory(options: Options, schematic: Schematic): Renderer;
  }

}
declare module 'shapeshifter/lib/readers/node' {
  import { SchemaStructure } from 'shapeshifter/lib/types';
  export default function readWithNode(path: string): SchemaStructure;

}
declare module 'shapeshifter/lib/readers/graphql' {
  import { SchemaStructure } from 'shapeshifter/lib/types';
  export default function readWithGraphQL(path: string): SchemaStructure;

}
declare module 'shapeshifter/lib/Transpiler' {
  import Schematic from 'shapeshifter/lib/Schematic';
  import { Options } from 'shapeshifter/lib/types';
  export default class Transpiler {
      options: Options;
      constructor(options: Options);
      transpile(targets: string[]): Promise<string>;
      transpileFolder(folderPath: string): string;
      transpileFile(filePath: string): string;
      extractSchematics(filePath: string): Schematic[];
      generate(filePaths: string[]): string;
      generateOutput(schematics: Schematic[]): string;
  }

}
declare module 'shapeshifter' {
  import Schema from 'shapeshifter/lib/Schema';
  import { MetadataField, PrimaryKey, Relation } from 'shapeshifter/lib/types';
  export { PrimaryKey, Relation, MetadataField };
  export default Schema;

}
