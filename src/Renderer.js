import config from './config';
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
   * @returns {String}
   */
  formatArray(items, depth) {
    if (Array.isArray(items)) {
      items = items.join('\n');
    }

    return `[\n${items}\n${indent(depth)}]`;
  }

  /**
   * Format a list (or string) of properties into an object respecting depth indentation.
   *
   * @param {String|Array} props
   * @param {Number} depth
   * @returns {String}
   */
  formatObject(props, depth) {
    if (Array.isArray(props)) {
      props = props.join('\n');
    }

    return `{\n${props}\n${indent(depth)}}`;
  }

  /**
   * Format a primitive value to it's visual representation.
   *
   * @param {*} value
   * @param {String} [type]
   * @returns {String}
   */
  formatValue(value, type) {
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
   * Return the schema name to be used as the prop type or type alias name.
   *
   * @param {String} [format]
   * @returns {String}
   */
  getSchemaName(format = '') {
    return (this.schema.name + format + config.schemaSuffix).replace(' ', '').trim();
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
   * Render a mapping of properties by formatting each value and prepending an indentation.
   *
   * @param {*[]} props
   * @param {Number} depth
   * @returns {Array}
   */
  renderObjectProps(props, depth = 0) {
    return props.map(prop => (
      indent(depth) + this.wrapProperty(prop.attribute, this.renderOrFormat(prop, depth))
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
