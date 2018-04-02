/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { Struct } from 'optimal';
import Builder from './Builder';
import Definition from './Definition';
import DefinitionFactory from './DefinitionFactory';
import Schema from './Schema';
import Schematic from './Schematic';
import ArrayDefinition from './definitions/Array';
import BoolDefinition from './definitions/Bool';
import EnumDefinition from './definitions/Enum';
import InstanceDefinition from './definitions/Instance';
import NumberDefinition from './definitions/Number';
import ObjectDefinition from './definitions/Object';
import PolymorphDefinition from './definitions/Polymorph';
import ReferenceDefinition from './definitions/Reference';
import ShapeDefinition from './definitions/Shape';
import StringDefinition from './definitions/String';
import UnionDefinition from './definitions/Union';
import indent from './helpers/indent';
import isObject from './helpers/isObject';
import formatName from './helpers/formatName';
import normalizeType from './helpers/normalizeType';
import {
  Config,
  ImportStructure,
  MetadataField,
  Options,
  PrimitiveType,
  ReferenceConfig,
} from './types';

export type TemplateList = string[];

export default class Renderer {
  builder: Builder;

  options: Options;

  schematic: Schematic;

  suffix: string;

  constructor(options: Options, builder: Builder, schematic: Schematic) {
    this.options = options;
    this.builder = builder;
    this.schematic = schematic;
    this.suffix = '';
  }

  /**
   * Triggered after parsing finished.
   */
  afterParse() {}

  /**
   * Triggered before parsing begins.
   */
  beforeParse() {}

  /**
   * Format a list (or string) of items into an array respecting depth indentation.
   */
  formatArray(
    items: string | string[],
    depth: number,
    itemSpacer: string = '\n',
    indentSpacer: string = '\n',
  ): string {
    const value = Array.isArray(items) ? items.join(itemSpacer) : items;

    return `[${indentSpacer}${value}${indentSpacer}${indent(depth, this.options.indentCharacter)}]`;
  }

  /**
   * Format a list (or string) of properties into an object respecting depth indentation.
   */
  formatObject(
    props: string | string[],
    depth: number,
    propSpacer: string = '\n',
    indentSpacer: string = '\n',
  ): string {
    const value = Array.isArray(props) ? props.join(propSpacer) : props;

    return `{${indentSpacer}${value}${indentSpacer}${indent(depth, this.options.indentCharacter)}}`;
  }

  /**
   * Format a primitive value to it's visual representation.
   */
  formatValue(value: any, type: string = ''): string {
    if (value === null) {
      return 'null';
    } else if (Array.isArray(value)) {
      return this.formatArray(value.map(v => this.formatValue(v)), 0, ', ', '');
    }

    const actualType = normalizeType(type || typeof value);

    switch (actualType) {
      case 'string':
        return `'${String(value)}'`;

      case 'function':
      case 'boolean':
        return `${String(value)}`;

      case 'number':
        return `${parseFloat(value)}`;

      default:
        throw new TypeError(`Unknown type "${actualType}" passed to formatValue().`);
    }
  }

  /**
   * Return the export name to be used as the prop type or type alias name.
   */
  getObjectName(...names: string[]): string {
    return names.map(name => formatName(name)).join('');
  }

  /**
   * Return the schema name with a lowercase first character.
   */
  getSchemaInstanceName(name: string): string {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  /**
   * Parse and render all information defined in the schema.
   */
  parse() {
    this.beforeParse();
    this.parseReferences(); // Must be first
    this.parseShapes();
    this.parseImports();
    this.parseConstants();
    this.parseSchemas();
    this.parseSets(); // Must be last
    this.afterParse();
  }

  /**
   * Parse all constants out of the schema and append to the renderer.
   */
  parseConstants() {
    const { constants } = this.schematic;

    Object.keys(constants).forEach((key: string) => {
      this.builder.constants.add(this.renderConstant(key, constants[key]));
    });
  }

  /**
   * Parse all imports out of the schema and append to the renderer.
   */
  parseImports() {
    this.schematic.imports.forEach((statement: ImportStructure) => {
      this.builder.imports.add(this.renderImport(statement));
    });
  }

  /**
   * Parse out all reference paths.
   */
  parseReferences() {}

  /**
   * Parse out all schemas.
   */
  parseSchemas() {
    if (!this.options.includeSchemas) {
      return;
    }

    const { attributes, name, metadata } = this.schematic;

    // Allow schematics to not require a Schema
    if (metadata.resourceName) {
      this.builder.schemas.add(
        this.renderSchema(this.getObjectName(name, 'Schema'), attributes, metadata),
      );
    }

    // Only add the import if schemas exist
    if (this.builder.schemas.size > 0) {
      this.builder.imports.add(
        this.renderImport({
          default: 'Schema',
          path: this.options.importPath,
        }),
      );
    }
  }

  /**
   * Parse all type subsets out of the schema and append to the renderer.
   */
  parseSets() {
    if (!this.options.includeDefinitions) {
      return;
    }

    const baseAttributes = this.schematic.data.attributes;
    const { attributes, subsets, name } = this.schematic;

    // Subsets
    Object.keys(subsets).forEach(setName => {
      const setAttributes: Definition<Config>[] = [];
      let subset = subsets[setName];

      if (Array.isArray(subset)) {
        subset = { attributes: subset };
      }

      const nullable = subset.nullable || {};

      subset.attributes.forEach(attribute => {
        let setConfig = baseAttributes[attribute];

        /* istanbul ignore next Hard to test */
        if (!setConfig) {
          throw new SyntaxError(`Attribute ${attribute} does not exist in the base schema.`);
        }

        if (typeof setConfig === 'string') {
          setConfig = { type: setConfig };
        } else {
          setConfig = { ...setConfig }; // Dereference original object
        }

        if (attribute in nullable) {
          setConfig.nullable = nullable[attribute];
        }

        setAttributes.push(DefinitionFactory.factory(this.options, attribute, setConfig));
      });

      this.builder.sets.add(
        this.render(this.getObjectName(name, setName, this.suffix), setAttributes),
      );
    });

    // Default set
    this.builder.sets.add(this.render(this.getObjectName(name, this.suffix), attributes));
  }

  /**
   * Render re-usable shapes.
   */
  parseShapes() {
    const { name, shapes } = this.schematic;

    Object.keys(shapes).forEach((key: string) => {
      const attributes = Object.keys(shapes[key]).map(attribute =>
        DefinitionFactory.factory(this.options, attribute, shapes[key][attribute]),
      );

      this.builder.sets.add(this.render(this.getObjectName(name, key, this.suffix), attributes));
    });
  }

  /**
   * Render the current schema into a formatted output.
   */
  render(setName: string, attributes: Definition<Config>[] = []): string {
    throw new Error('Renderer not implemented.');
  }

  /**
   * Render a definition to it's visual representation.
   */
  renderAttribute(definition: Definition<Config>, depth: number = 0): string {
    if (definition instanceof ArrayDefinition) {
      return this.renderArray(definition, depth);
    } else if (definition instanceof BoolDefinition) {
      return this.renderBool(definition);
    } else if (definition instanceof EnumDefinition) {
      return this.renderEnum(definition, depth);
    } else if (definition instanceof InstanceDefinition) {
      return this.renderInstance(definition);
    } else if (definition instanceof NumberDefinition) {
      return this.renderNumber(definition);
    } else if (definition instanceof ObjectDefinition) {
      return this.renderObject(definition, depth);
    } else if (definition instanceof PolymorphDefinition) {
      return this.renderPolymorph(definition, depth);
    } else if (definition instanceof ReferenceDefinition) {
      return this.renderReference(definition);
    } else if (definition instanceof ShapeDefinition) {
      return this.renderShape(definition, depth);
    } else if (definition instanceof StringDefinition) {
      return this.renderString(definition);
    } else if (definition instanceof UnionDefinition) {
      return this.renderUnion(definition, depth);
    }

    return '';
  }

  /**
   * Render an array definition.
   */
  renderArray(definition: ArrayDefinition, depth: number): string {
    return this.unsupported('array');
  }

  /**
   * Render an array of values by formatting each value and prepending an indentation.
   */
  renderArrayItems(items: PrimitiveType[], depth: number = 0, valueType: string = ''): string[] {
    return items.map(item => this.wrapItem(this.formatValue(item, valueType), depth));
  }

  /**
   * Render an array of definitions by formatting each value and prepending an indentation.
   */
  renderArrayDefinitions(items: Definition<Config>[], depth: number = 0): string[] {
    return Array.from(
      new Set(items.map(item => this.wrapItem(this.renderAttribute(item, depth), depth))),
    );
  }

  /**
   * Render a boolean definition.
   */
  renderBool(definition: BoolDefinition): string {
    return this.unsupported('boolean');
  }

  /**
   * Render a constant.
   */
  renderConstant(name: string, value: PrimitiveType | PrimitiveType[]): string {
    let constValue;

    if (Array.isArray(value)) {
      constValue = this.formatArray(value.map(v => this.formatValue(v)), 0, ', ', '');
    } else {
      constValue = this.formatValue(value);
    }

    return `export const ${name} = ${constValue};`;
  }

  /**
   * Render an enum definition.
   */
  renderEnum(definition: EnumDefinition, depth: number): string {
    return this.unsupported('enum');
  }

  /**
   * Render an import statement.
   */
  renderImport(statement: ImportStructure): string {
    const { default: defaultName, named = [], path } = statement;

    if (!path) {
      throw new SyntaxError('Import statements require a file path.');
    } else if (!Array.isArray(named)) {
      throw new TypeError('Named imports must be an array.');
    }

    const imports = [];

    if (defaultName) {
      imports.push(defaultName);
    }

    if (named.length > 0) {
      imports.push(this.formatObject(named, 0, ', ', ' '));
    }

    if (imports.length === 0) {
      throw new Error('Import statements require either a default export or named exports.');
    }

    return `import ${imports.join(', ')} from '${path}';`;
  }

  /**
   * Render an instance definition.
   */
  renderInstance(definition: InstanceDefinition): string {
    return this.unsupported('instance');
  }

  /**
   * Render a number definition.
   */
  renderNumber(definition: NumberDefinition): string {
    return this.unsupported('number');
  }

  /**
   * Render an object definition.
   */
  renderObject(definition: ObjectDefinition, depth: number): string {
    return this.unsupported('object');
  }

  /**
   * Render a mapping of properties by formatting each value and prepending an indentation.
   */
  renderObjectProps(props: Definition<Config>[], depth: number = 0, sep: string = ','): string[] {
    return props.map(prop =>
      this.wrapProperty(this.wrapPropertyName(prop), this.renderAttribute(prop, depth), depth, sep),
    );
  }

  /**
   * Either render a definition or format a value.
   */
  renderOrFormat(
    value: PrimitiveType | Definition<Config>,
    depth: number,
    valueType: string = '',
  ): string {
    return value instanceof Definition
      ? this.renderAttribute(value, depth)
      : this.formatValue(value, valueType);
  }

  /**
   * Render a plain JS object.
   */
  renderPlainObject(object: Struct, depth: number = 0): string {
    return this.formatObject(
      Object.keys(object).map(key =>
        this.wrapProperty(key, this.formatValue(object[key]), depth + 1),
      ),
      depth,
    );
  }

  /**
   * Render a polymorph definition.
   */
  renderPolymorph(definition: PolymorphDefinition, depth: number): string {
    definition.valueTypes.forEach(value => {
      if (!(value instanceof ShapeDefinition || value instanceof ReferenceDefinition)) {
        throw new TypeError('Polymorphic relations must be references or shape references.');
      }
    });

    return this.renderUnion(definition, depth);
  }

  /**
   * Render a reference definition.
   */
  renderReference(definition: ReferenceDefinition): string {
    const { reference, self, subset = '' } = definition.config;
    const refSchema = self ? this.schematic : this.schematic.referenceSchematics[reference];

    if (!refSchema) {
      throw new SyntaxError(
        `The reference "${reference}" does not exist in the "${this.schematic.name}" schema.`,
      );
    }

    if (subset && !refSchema.subsets[subset]) {
      throw new SyntaxError(
        `The reference "${reference}" does not contain a subset named "${subset}".`,
      );
    }

    return this.getObjectName(refSchema.name, subset, this.suffix);
  }

  /**
   * Render a class schema.
   */
  renderSchema(
    name: string,
    attributes: Definition<Config>[] = [],
    metadata: MetadataField,
  ): string {
    const { primaryKey, resourceName, ...meta } = metadata;
    const { includeAttributes, useDefine } = this.options;
    const references = this.schematic.referenceSchematics;
    const fields: string[] = [];
    const relations: { [key: string]: string[] } = {
      [Schema.HAS_ONE]: [],
      [Schema.HAS_MANY]: [],
      [Schema.BELONGS_TO]: [],
      [Schema.BELONGS_TO_MANY]: [],
    };

    if (!resourceName || typeof resourceName !== 'string') {
      throw new SyntaxError(
        `Schema ${name} requires a "meta.resourceName" property to be defined. ` +
          'The resource name is a unique key found within a URL.',
      );
    }

    let relationDefinition: ReferenceDefinition | null = null;
    let relationType: string = '';

    // eslint-disable-next-line complexity
    attributes.forEach(definition => {
      relationDefinition = null;

      if (includeAttributes) {
        fields.push(this.wrapItem(this.formatValue(definition.attribute, 'string'), 1));
      }

      // Single
      if (definition instanceof ReferenceDefinition) {
        relationDefinition = definition;
        relationType = Schema.HAS_ONE;
      }

      // Multiple
      if (
        (definition instanceof ArrayDefinition || definition instanceof ObjectDefinition) &&
        definition.valueType &&
        definition.valueType instanceof ReferenceDefinition
      ) {
        relationDefinition = definition.valueType;
        relationType = Schema.HAS_MANY;
      }

      // Validate and format template
      if (relationDefinition) {
        /* istanbul ignore next Hard to test */
        if (typeof relations[relationType] === 'undefined') {
          throw new TypeError(
            `Invalid relation type for reference attribute "${definition.attribute}".`,
          );
        }

        const relationConfig: ReferenceConfig = relationDefinition.config;

        if (!relationConfig.export) {
          return;
        }

        // Format the output
        const relationName = relationConfig.self
          ? this.schematic.name
          : references[relationConfig.reference].name;
        const schemaName = this.getSchemaInstanceName(this.getObjectName(relationName, 'Schema'));
        const isCollection =
          relationType === Schema.HAS_MANY || relationType === Schema.BELONGS_TO_MANY;

        relations[relationConfig.relation || relationType].push(
          this.wrapProperty(
            relationDefinition.attribute,
            useDefine && isCollection ? `[${schemaName}]` : schemaName,
            1,
          ),
        );
      }
    });

    const args = [this.formatValue(resourceName, 'string')];

    if (primaryKey) {
      args.push(this.formatValue(primaryKey));
    }

    if (isObject(meta) && Object.keys(meta).length > 0) {
      args.push(this.renderPlainObject(meta));
    }

    const schemaName = this.getSchemaInstanceName(name);
    const schemaTemplate = `export const ${schemaName} = new Schema(${args.join(', ')});`;

    // Generate relations separately so that we avoid circular references
    let relationTemplate = '';

    if (fields.length > 0) {
      relationTemplate += `.addAttributes(${this.formatArray(fields, 0)})`;
    }

    if (useDefine) {
      const useDefineList = Object.keys(relations).reduce(
        (joined: string[], relation: string) => [...joined, ...relations[relation]],
        [],
      );

      if (useDefineList.length > 0) {
        relationTemplate += `.define(${this.formatObject(useDefineList, 0)})`;
      }
    } else {
      Object.keys(relations).forEach((relation: string) => {
        if (relations[relation].length > 0) {
          relationTemplate += `.${relation}(${this.formatObject(relations[relation], 0)})`;
        }
      });
    }

    if (relationTemplate) {
      this.builder.relations.add(`${schemaName}${relationTemplate};`);
    }

    return `${schemaTemplate}`;
  }

  /**
   * Render a shape definition.
   */
  renderShape(definition: ShapeDefinition, depth: number): string {
    return this.unsupported('shape');
  }

  /**
   * Render a shape reference definition.
   */
  renderShapeReference(definition: ShapeDefinition): string {
    const { reference } = definition.config;
    const { name, shapes } = this.schematic;

    if (!reference) {
      return '';
    } else if (!shapes[reference]) {
      throw new SyntaxError(
        `The shape reference "${reference}" does not exist in the "${name}" schema.`,
      );
    }

    return this.getObjectName(name, reference, this.suffix);
  }

  /**
   * Render a string definition.
   */
  renderString(definition: StringDefinition): string {
    return this.unsupported('string');
  }

  /**
   * Render a union definition.
   */
  renderUnion(definition: UnionDefinition, depth: number): string {
    return this.unsupported('union');
  }

  /**
   * Throws an error if a definition is not supported.
   */
  unsupported(definition: string): string {
    throw new Error(`The "${definition}" definition is not supported by ${this.constructor.name}.`);
  }

  /**
   * Render a name and optional arguments into an function representation.
   */
  wrapFunction(name: string, args: string = ''): string {
    return `${name}(${args})`;
  }

  /**
   * Render a generics alias with optional type arguments.
   */
  wrapGenerics(alias: string, ...types: string[]): string {
    return `${alias}<${types.join(', ')}>`;
  }

  /**
   * Return a piece of code wrapped in an IIFE.
   */
  wrapIIFE(code: string): string {
    return `(function () { return ${code}; }())`;
  }

  /**
   * Render a value into an array item representation.
   */
  wrapItem(value: string, depth: number = 0): string {
    return `${indent(depth, this.options.indentCharacter)}${value},`;
  }

  /**
   * Render a key and value into an object property representation.
   */
  wrapProperty(key: string, value: string, depth: number = 0, sep: string = ','): string {
    return `${indent(depth, this.options.indentCharacter)}${key}: ${value}${sep || ','}`;
  }

  /**
   * Return the property name as is.
   */
  wrapPropertyName(definition: Definition<Config>): string {
    return definition.attribute;
  }
}
