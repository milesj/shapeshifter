/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Factory from './Factory';
import Definition from './Definition';
import Schema from './Schema';
import SchemaReader from './SchemaReader';
import ArrayDefinition from './definitions/Array';
import BoolDefinition from './definitions/Bool';
import EnumDefinition from './definitions/Enum';
import FuncDefinition from './definitions/Func';
import InstanceDefinition from './definitions/Instance';
import NumberDefinition from './definitions/Number';
import ObjectDefinition from './definitions/Object';
import ReferenceDefinition from './definitions/Reference';
import ShapeDefinition from './definitions/Shape';
import StringDefinition from './definitions/String';
import UnionDefinition from './definitions/Union';
import indent from './helpers/indent';
import formatName from './helpers/formatName';
import normalizeType from './helpers/normalizeType';
import isObject from './helpers/isObject';

import type {
  Options,
  BaseConfig,
  ReferenceConfig,
  PrimitiveType,
  MetadataField,
  ImportStructure,
} from './types';

type TemplateList = string[];

export default class Renderer {
  options: Options;
  reader: SchemaReader;
  suffix: string;
  imports: TemplateList;
  constants: TemplateList;
  header: TemplateList;
  sets: TemplateList;
  schemas: TemplateList;
  relations: TemplateList;
  referencePaths: string[];

  constructor(options: Options, reader: SchemaReader) {
    this.options = options;
    this.reader = reader;
    this.suffix = '';
    this.imports = [];
    this.constants = [];
    this.header = [];
    this.sets = [];
    this.schemas = [];
    this.relations = [];
    this.referencePaths = [];
  }

  /**
   * Triggered after parsing finished.
   */
  afterParse(): void {}

  /**
   * Triggered before parsing begins.
   */
  beforeParse(): void {}

  /**
   * Format a list (or string) of items into an array respecting depth indentation.
   *
   * @param {String|Array} items
   * @param {Number} depth
   * @param {String} itemSpacer
   * @param {String} indentSpacer
   * @returns {String}
   */
  formatArray(
    items: string | string[],
    depth: number,
    itemSpacer: string = '\n',
    indentSpacer: string = '\n'
  ): string {
    if (Array.isArray(items)) {
      items = items.join(itemSpacer);
    }

    return `[${indentSpacer}${items}${indentSpacer}${indent(depth, this.options.indentCharacter)}]`;
  }

  /**
   * Format a list (or string) of properties into an object respecting depth indentation.
   *
   * @param {String|Array} props
   * @param {Number} depth
   * @param {String} propSpacer
   * @param {String} indentSpacer
   * @returns {String}
   */
  formatObject(
    props: string | string[],
    depth: number,
    propSpacer: string = '\n',
    indentSpacer: string = '\n'
  ): string {
    if (Array.isArray(props)) {
      props = props.join(propSpacer);
    }

    return `{${indentSpacer}${props}${indentSpacer}${indent(depth, this.options.indentCharacter)}}`;
  }

  /**
   * Format a primitive value to it's visual representation.
   *
   * @param {*} value
   * @param {String} [type]
   * @returns {String}
   */
  formatValue(value: any, type?: string): string {
    if (value === null) {
      return 'null';
    }

    type = normalizeType(type || typeof value);

    switch (type) {
      case 'string':
        return `'${value}'`;

      case 'function':
      case 'boolean':
        return `${value}`;

      case 'number':
        return `${parseFloat(value)}`;

      default:
        throw new TypeError(`Unknown type "${type}" passed to formatValue().`);
    }
  }

  /**
   * Return a rendered list of constants to place at the top of the file.
   *
   * @returns {String[]}
   */
  getConstants(): TemplateList {
    return this.constants;
  }

  /**
   * Return a header template to place at the top of the file after constants.
   *
   * @returns {String[]}
   */
  getHeader(): TemplateList {
    return this.header;
  }

  /**
   * Return a rendered list of imports to place at the top of the file.
   *
   * @returns {String[]}
   */
  getImports(): TemplateList {
    return this.imports;
  }

  /**
   * Return a list of all relative reference paths.
   *
   * @returns {String[]}
   */
  getReferences(): TemplateList {
    return this.referencePaths;
  }

  /**
   * Return the export name to be used as the prop type or type alias name.
   *
   * @param {String...} names
   * @returns {String}
   */
  getObjectName(...names: string[]): string {
    return names.map(formatName).join('');
  }

  /**
   * Return a list of schema relations.
   *
   * @returns {String[]}
   */
  getRelations(): TemplateList {
    return this.relations;
  }

  /**
   * Return a list of schema class definitions.
   *
   * @returns {String[]}
   */
  getSchemas(): TemplateList {
    return this.schemas;
  }

  /**
   * Return a list of the primary set and all subsets.
   *
   * @returns {String[]}
   */
  getSets(): TemplateList {
    return this.sets;
  }

  /**
   * Parse and render all information defined in the schema.
   */
  parse(): void {
    this.beforeParse();
    this.parseReferences();
    this.parseImports();
    this.parseConstants();
    this.parseSchemas();
    this.parseSets();
    this.afterParse();
  }

  /**
   * Parse all constants out of the schema and append to the renderer.
   */
  parseConstants(): void {
    const { constants } = this.reader;

    Object.keys(constants).forEach(key => {
      this.constants.push(this.renderConstant(key, constants[key]));
    });
  }

  /**
   * Parse all imports out of the schema and append to the renderer.
   */
  parseImports(): void {
    this.reader.imports.forEach(importStatement => {
      this.imports.push(this.renderImport(importStatement));
    });
  }

  /**
   * Parse out all reference paths.
   */
  parseReferences(): void {
    Object.keys(this.reader.references).forEach(key => {
      this.referencePaths.push(this.reader.references[key]);
    });
  }

  /**
   * Parse out all schemas.
   */
  parseSchemas(): void {
    if (!this.options.includeSchemas) {
      return;
    }

    const { attributes, name, metadata } = this.reader;

    this.imports.unshift(this.renderImport({
      default: 'Schema',
      path: 'shapeshifter',
    }));

    this.schemas.push(this.renderSchema(
      this.getObjectName(name, 'Schema'),
      attributes,
      metadata
    ));
  }

  /**
   * Parse all type subsets out of the schema and append to the renderer.
   */
  parseSets(): void {
    if (!this.options.includeTypes) {
      return;
    }

    const baseAttributes = this.reader.data.attributes;
    const { attributes, subsets, name } = this.reader;

    // Subsets
    Object.keys(subsets).forEach(setName => {
      const setAttributes = [];
      let subset = subsets[setName];

      if (Array.isArray(subset)) {
        subset = { attributes: subset };
      }

      const nullable = subset.null || {};
      const required = subset.required || {};

      subset.attributes.forEach((attribute) => {
        let setConfig = baseAttributes[attribute];

        if (!setConfig) {
          throw new SyntaxError(`Attribute ${attribute} does not exist in the base schema.`);
        }

        if (typeof setConfig === 'string') {
          setConfig = ({ type: setConfig }: BaseConfig);
        } else {
          setConfig = ({ ...setConfig }: BaseConfig); // Dereference original object
        }

        if (attribute in nullable) {
          setConfig.null = nullable[attribute];
        }

        if (attribute in required) {
          setConfig.required = required[attribute];
        }

        setAttributes.push(Factory.definition(this.options, attribute, setConfig));
      });

      this.sets.push(this.render(this.getObjectName(name, setName, this.suffix), setAttributes));
    });

    // Default set
    this.sets.push(this.render(this.getObjectName(name, this.suffix), attributes));
  }

  /**
   * Render the current schema into a formatted output.
   */
  render(): string {
    throw new Error('Renderer not implemented.');
  }

  /**
   * Render a definition to it's visual representation.
   *
   * @param {Definition} definition
   * @param {Number} depth
   * @returns {String}
   */
  renderAttribute(definition: Definition, depth: number = 0): string {
    if (definition instanceof ArrayDefinition) {
      return this.renderArray(definition, depth);

    } else if (definition instanceof BoolDefinition) {
      return this.renderBool(definition, depth);

    } else if (definition instanceof EnumDefinition) {
      return this.renderEnum(definition, depth);

    } else if (definition instanceof FuncDefinition) {
      return this.renderFunc(definition, depth);

    } else if (definition instanceof InstanceDefinition) {
      return this.renderInstance(definition, depth);

    } else if (definition instanceof NumberDefinition) {
      return this.renderNumber(definition, depth);

    } else if (definition instanceof ObjectDefinition) {
      return this.renderObject(definition, depth);

    } else if (definition instanceof ReferenceDefinition) {
      return this.renderReference(definition, depth);

    } else if (definition instanceof ShapeDefinition) {
      return this.renderShape(definition, depth);

    } else if (definition instanceof StringDefinition) {
      return this.renderString(definition, depth);

    } else if (definition instanceof UnionDefinition) {
      return this.renderUnion(definition, depth);
    }

    return '';
  }

  /**
   * Render an array definition.
   */
  renderArray(): string {
    return this.unsupported('array');
  }

  /**
   * Render an array of items by formatting each value and prepending an indentation.
   *
   * @param {*[]} items
   * @param {Number} depth
   * @param {String} [valueType]
   * @returns {Array}
   */
  renderArrayItems(items: any[], depth: number = 0, valueType: string): string[] {
    return items.map(item => this.wrapItem(this.renderOrFormat(item, depth, valueType), depth));
  }

  /**
   * Render a boolean definition.
   */
  renderBool(): string {
    return this.unsupported('boolean');
  }

  /**
   * Render a constant.
   *
   * @param {String} name
   * @param {*} value
   * @returns {String}
   */
  renderConstant(name: string, value: PrimitiveType | PrimitiveType[]): string {
    if (Array.isArray(value)) {
      value = this.formatArray(value.map(v => this.formatValue(v)), 0, ', ', '');
    } else {
      value = this.formatValue(value);
    }

    return `export const ${name} = ${value};`;
  }

  /**
   * Render an enum definition.
   */
  renderEnum(): string {
    return this.unsupported('enum');
  }

  /**
   * Render a function definition.
   */
  renderFunc(): string {
    return this.unsupported('function');
  }

  /**
   * Render an import statement.
   *
   * @param {String} defaultName
   * @param {String[]} named
   * @param {String} path
   * @returns {String}
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

    if (named.length) {
      imports.push(this.formatObject(named, 0, ', ', ' '));
    }

    if (!imports.length) {
      throw new Error('Import statements require either a default export or named exports.');
    }

    return `import ${imports.join(', ')} from '${path}';`;
  }

  /**
   * Render an instance definition.
   */
  renderInstance(): string {
    return this.unsupported('instance');
  }

  /**
   * Render a number definition.
   */
  renderNumber(): string {
    return this.unsupported('number');
  }

  /**
   * Render an object definition.
   */
  renderObject(): string {
    return this.unsupported('object');
  }

  /**
   * Render a mapping of properties by formatting each value and prepending an indentation.
   *
   * @param {Definition[]} props
   * @param {Number} depth
   * @param {String} sep
   * @returns {Array}
   */
  renderObjectProps(props: Definition[], depth: number = 0, sep: string = ','): string[] {
    return props.map(prop => (
      this.wrapProperty(this.wrapPropertyName(prop), this.renderAttribute(prop, depth), depth, sep)
    ));
  }

  /**
   * Either render a definition or format a value.
   *
   * @param {*|Definition} value
   * @param {Number} depth
   * @param {String} [valueType]
   * @returns {String}
   */
  renderOrFormat(value: any | Definition, depth: number, valueType: string): string {
    return (value instanceof Definition)
      ? this.renderAttribute(value, depth)
      : this.formatValue(value, valueType);
  }

  /**
   * Render a reference definition.
   *
   * @param {Definition} definition
   * @returns {String}
   */
  renderReference(definition: Definition): string {
    const { reference, self, subset } = definition.config;
    const refReader = self ? this.reader : this.reader.referenceReaders[reference];

    if (!refReader) {
      throw new SyntaxError(
        `The reference "${reference}" does not exist in the "${this.reader.name}" schema.`
      );
    }

    if (subset && !refReader.subsets[subset]) {
      throw new SyntaxError(
        `The reference "${reference}" does not contain a subset named "${subset}".`
      );
    }

    return this.getObjectName(refReader.name, subset, this.suffix);
  }

  /**
   * Render a class schema.
   *
   * @param {String} name
   * @param {Definition[]} attributes
   * @param {Object} metadata
   * @returns {string}
   */
  renderSchema(name: string, attributes: Definition[] = [], metadata: MetadataField): string {
    const { primaryKey, resourceName } = metadata;
    const { includeAttributes } = this.options;
    const references = this.reader.referenceReaders;
    const fields = [];
    const relations: { [key: string]: string[] } = {
      [Schema.HAS_ONE]: [],
      [Schema.HAS_MANY]: [],
      [Schema.BELONGS_TO]: [],
      [Schema.BELONGS_TO_MANY]: [],
    };

    if (!resourceName || typeof resourceName !== 'string') {
      throw new SyntaxError(
        `Schema ${name} requires a "meta.resourceName" property to be defined. ` +
        'The resource name is a unique key found within a URL.'
      );
    }

    let relationDefinition: ?ReferenceDefinition = null;
    let relationType: string = '';

    attributes.forEach((definition) => {
      if (includeAttributes) {
        fields.push(this.wrapItem(this.formatValue(definition.attribute, 'string'), 1));
      }

      // Single
      if (definition instanceof ReferenceDefinition) {
        relationDefinition = definition;
        relationType = Schema.HAS_ONE;
      }

      // Multiple
      if (definition instanceof ArrayDefinition) {
        if (definition.valueType instanceof ReferenceDefinition) {
          relationDefinition = definition.valueType;
          relationType = Schema.HAS_MANY;
        }
      }

      // Validate and format template
      if (relationDefinition) {
        if (typeof relations[relationType] === 'undefined') {
          throw new Error(
            `Invalid relation type for reference attribute "${definition.attribute}".`
          );
        }

        const relationConfig: ReferenceConfig = relationDefinition.config;
        const relationName: string = (relationConfig.self || !relationConfig.reference)
          ? this.reader.name
          : references[relationConfig.reference].name;

        if (!relationConfig.export) {
          return;
        }

        relations[relationConfig.relation || relationType].push(this.wrapProperty(
          relationDefinition.attribute,
          this.getObjectName(relationName, 'Schema'),
          1
        ));
      }
    });

    const args = [this.formatValue(resourceName, 'string')];

    if (primaryKey) {
      args.push(this.formatValue(primaryKey, 'string'));
    }

    const schemaTemplate = `export const ${name} = new Schema(${args.join(', ')});`;

    // Generate relations separately so that we avoid circular references
    let relationTemplate = '';

    if (fields.length) {
      relationTemplate += `.addAttributes(${this.formatArray(fields, 0)})`;
    }

    Object.keys(relations).forEach((relation) => {
      if (relations[relation].length) {
        relationTemplate += `.${relation}(${this.formatObject(relations[relation], 0)})`;
      }
    });

    if (relationTemplate) {
      this.relations.push(`${name}${relationTemplate};`);
    }

    return `${schemaTemplate}`;
  }

  /**
   * Render a shape definition.
   */
  renderShape(): string {
    return this.unsupported('shape');
  }

  /**
   * Render a union definition.
   */
  renderUnion(): string {
    return this.unsupported('union');
  }

  /**
   * Render a string definition.
   */
  renderString(): string {
    return this.unsupported('string');
  }

  /**
   * Throws an error if a definition is not supported.
   *
   * @param {String} definition
   */
  unsupported(definition: string): string {
    throw new Error(`The "${definition}" definition is not supported by ${this.constructor.name}.`);
  }

  /**
   * Render a name and optional arguments into an function representation.
   *
   * @param {String} name
   * @param {String} [args]
   * @returns {String}
   */
  wrapFunction(name: string, args: string = ''): string {
    return `${name}(${args})`;
  }

  /**
   * Render a generics alias with optional type arguments.
   *
   * @param {String} alias
   * @param {String[]} types
   * @returns {String}
     */
  wrapGenerics(alias: string, ...types: string[]): string {
    return `${alias}<${types.join(', ')}>`;
  }

  /**
   * Return a piece of code wrapped in an IIFE.
   *
   * @param {String} code
   * @returns {String}
   */
  wrapIIFE(code: string): string {
    return `(function () { return ${code}; }())`;
  }

  /**
   * Render a value into an array item representation.
   *
   * @param {String} value
   * @param {Number} depth
   * @returns {String}
   */
  wrapItem(value: string, depth: number = 0): string {
    return `${indent(depth, this.options.indentCharacter)}${value},`;
  }

  /**
   * Render a key and value into an object property representation.
   *
   * @param {String} key
   * @param {String} value
   * @param {Number} depth
   * @param {String} sep
   * @returns {String}
   */
  wrapProperty(key: string, value: string, depth: number = 0, sep: string = ','): string {
    return `${indent(depth, this.options.indentCharacter)}${key}: ${value}${sep || ','}`;
  }

  /**
   * Return the property name as is.
   *
   * @param {Definition} definition
   * @returns {String}
   */
  wrapPropertyName(definition: Definition): string {
    return definition.attribute;
  }
}
