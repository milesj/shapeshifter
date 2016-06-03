import config from './config';
import Factory from './Factory';
import Definition from './Definition';
import ArrayDef from './definitions/Array';
import BoolDef from './definitions/Bool';
import EnumDef from './definitions/Enum';
import FuncDef from './definitions/Func';
import InstanceDef from './definitions/Instance';
import NumberDef from './definitions/Number';
import ObjectDef from './definitions/Object';
import ShapeDef from './definitions/Shape';
import StringDef from './definitions/String';
import UnionDef from './definitions/Union';
import indent from './helpers/indent';
import normalizeType from './helpers/normalizeType';

export default class Renderer {
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Format a list (or string) of items into an array respecting depth indentation.
   *
   * @param {String|Array} items
   * @param {Number} depth
   * @param {String} itemSpacer
   * @param {String} indentSpacer
   * @returns {String}
   */
  formatArray(items, depth, itemSpacer = '\n', indentSpacer = '\n') {
    if (Array.isArray(items)) {
      items = items.join(itemSpacer);
    }

    return `[${indentSpacer}${items}${indentSpacer}${indent(depth)}]`;
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
  formatObject(props, depth, propSpacer = '\n', indentSpacer = '\n') {
    if (Array.isArray(props)) {
      props = props.join(propSpacer);
    }

    return `{${indentSpacer}${props}${indentSpacer}${indent(depth)}}`;
  }

  /**
   * Format a primitive value to it's visual representation.
   *
   * @param {*} value
   * @param {String} [type]
   * @returns {String}
   */
  formatValue(value, type) {
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
  getConstants() {
    const { constants } = this.schema;
    const response = [];

    Object.keys(constants).forEach(key => {
      response.push(this.renderConstant(key, constants[key]));
    });

    return response;
  }

  /**
   * Return a header template to place at the top of the file.
   *
   * @returns {String}
   */
  getHeader() {
    return '';
  }

  /**
   * Return a rendered list of imports to place at the top of the file.
   *
   * @returns {String[]}
   */
  getImports() {
    const response = [];

    this.schema.imports.forEach(importStatement => {
      response.push(this.renderImport(importStatement));
    });

    return response;
  }

  /**
   * Return the schema name to be used as the prop type or type alias name.
   *
   * @param {String} [setName]
   * @returns {String}
   */
  getSchemaName(setName = '') {
    return [this.schema.name, setName, config.schemaSuffix]
      .map(value => {
        if (!value) {
          return '';
        }

        value = value
          .replace(/[^a-zA-Z0-9]+/g, ' ')
          .replace(/\W+(.)/g, match => match[1].toUpperCase())
          .trim();

        return value.charAt(0).toUpperCase() + value.slice(1);
      })
      .join('');
  }

  /**
   * Return a list of the primary set and all subsets.
   *
   * @returns {String[]}
   */
  getSets() {
    const response = [];
    const baseAttributes = this.schema.schema.attributes;
    const { attributes, subsets } = this.schema;

    // Default set
    response.push(this.render('', attributes));

    // Subsets
    Object.keys(subsets).forEach(setName => {
      const setAttributes = [];
      let subset = subsets[setName];

      if (Array.isArray(subset)) {
        subset = { attributes: subset };
      }

      const nullable = subset.null || {};
      const required = subset.required || {};

      subset.attributes.forEach(attribute => {
        let setConfig = baseAttributes[attribute];

        if (!setConfig) {
          throw new SyntaxError(`Attribute ${attribute} does not exist in the base schema.`);
        }

        if (typeof setConfig === 'string') {
          setConfig = { type: setConfig };
        } else {
          setConfig = { ...setConfig }; // Dereference original object
        }

        if (nullable.hasOwnProperty(attribute)) {
          setConfig.null = nullable[attribute];
        }

        if (required.hasOwnProperty(attribute)) {
          setConfig.required = required[attribute];
        }

        setAttributes.push(Factory.definition(attribute, setConfig));
      });

      response.push(this.render(setName, setAttributes));
    });

    return response;
  }

  /**
   * Render the current schema into a formatted output.
   */
  render() {
    throw new Error('Renderer not implemented.');
  }

  /**
   * Render a definition to it's visual representation.
   *
   * @param {Definition} definition
   * @param {Number} depth
   * @returns {String}
   */
  renderAttribute(definition, depth = 0) {
    if (definition instanceof ArrayDef) {
      return this.renderArray(definition, depth);

    } else if (definition instanceof BoolDef) {
      return this.renderBool(definition, depth);

    } else if (definition instanceof EnumDef) {
      return this.renderEnum(definition, depth);

    } else if (definition instanceof FuncDef) {
      return this.renderFunc(definition, depth);

    } else if (definition instanceof InstanceDef) {
      return this.renderInstance(definition, depth);

    } else if (definition instanceof NumberDef) {
      return this.renderNumber(definition, depth);

    } else if (definition instanceof ObjectDef) {
      return this.renderObject(definition, depth);

    } else if (definition instanceof ShapeDef) {
      return this.renderShape(definition, depth);

    } else if (definition instanceof StringDef) {
      return this.renderString(definition, depth);

    } else if (definition instanceof UnionDef) {
      return this.renderUnion(definition, depth);
    }

    return null;
  }

  /**
   * Render an array definition.
   */
  renderArray() {
    this.unsupported('array');
  }

  /**
   * Render an array of items by formatting each value and prepending an indentation.
   *
   * @param {*[]} items
   * @param {Number} depth
   * @param {String} [valueType]
   * @returns {Array}
   */
  renderArrayItems(items, depth = 0, valueType) {
    return items.map(item => (
      indent(depth) + this.wrapItem(this.renderOrFormat(item, depth, valueType))
    ));
  }

  /**
   * Render a boolean definition.
   */
  renderBool() {
    this.unsupported('boolean');
  }

  /**
   * Render a constant.
   *
   * @param {String} name
   * @param {*} value
   * @returns {String}
   */
  renderConstant(name, value) {
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
  renderEnum() {
    this.unsupported('enum');
  }

  /**
   * Render a function definition.
   */
  renderFunc() {
    this.unsupported('function');
  }

  /**
   * Render an import statement.
   *
   * @param {String} defaultName
   * @param {String[]} named
   * @param {String} path
   * @returns {String}
   */
  renderImport({ default: defaultName, named = [], path }) {
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
  renderInstance() {
    this.unsupported('instance');
  }

  /**
   * Render a number definition.
   */
  renderNumber() {
    this.unsupported('number');
  }

  /**
   * Render an object definition.
   */
  renderObject() {
    this.unsupported('object');
  }

  /**
   * Render a mapping of properties by formatting each value and prepending an indentation.
   *
   * @param {Definition[]} props
   * @param {Number} depth
   * @returns {Array}
   */
  renderObjectProps(props, depth = 0) {
    return props.map(prop => (
      indent(depth) + this.wrapProperty(prop.attribute, this.renderAttribute(prop, depth))
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
  renderOrFormat(value, depth, valueType) {
    return (value instanceof Definition)
      ? this.renderAttribute(value, depth)
      : this.formatValue(value, valueType);
  }

  /**
   * Render a shape definition.
   */
  renderShape() {
    this.unsupported('shape');
  }

  /**
   * Render a union definition.
   */
  renderUnion() {
    this.unsupported('union');
  }

  /**
   * Render a string definition.
   */
  renderString() {
    this.unsupported('string');
  }

  /**
   * Throws an error if a definition is not supported.
   *
   * @param {String} definition
   */
  unsupported(definition) {
    throw new Error(`The "${definition}" definition is not supported by ${this.constructor.name}.`);
  }

  /**
   * Render a name and optional arguments into an function representation.
   *
   * @param {String} name
   * @param {String} [args]
   * @returns {String}
   */
  wrapFunction(name, args = '') {
    return `${name}(${args})`;
  }

  /**
   * Render a value into an array item representation.
   *
   * @param {String} value
   * @returns {String}
   */
  wrapItem(value) {
    return `${value},`;
  }

  /**
   * Render a key and value into an object property representation.
   *
   * @param {String} key
   * @param {String} value
   * @returns {String}
   */
  wrapProperty(key, value) {
    return `${key}: ${value},`;
  }
}
