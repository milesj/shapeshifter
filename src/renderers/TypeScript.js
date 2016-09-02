/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Renderer from '../Renderer';
import FuncDefinition from '../definitions/Func';
import indent from '../helpers/indent';
import formatName from '../helpers/formatName';
import isPrimitive from '../helpers/isPrimitive';
import normalizeType from '../helpers/normalizeType';

export default class TypeScriptRenderer extends Renderer {
  constructor(schema) {
    super(schema);

    this.suffix = 'Interface';
  }

  /**
   * {@inheritDoc}
   */
  render(setName, attributes = {}) {
    return `export interface ${setName} ${this.renderShape({ attributes }, 0)}`;
  }

  /**
   * {@inheritDoc}
   */
  renderArray(definition, depth) {
    const configType = definition.valueType.config.type;
    let template = this.renderAttribute(definition.valueType, depth);

    if (isPrimitive(configType) || configType === 'instance') {
      template += '[]';
    } else {
      template = this.wrapGenerics('Array', template);
    }

    return template;
  }

  /**
   * {@inheritDoc}
   */
  renderBool() {
    return 'boolean';
  }

  /**
   * {@inheritDoc}
   */
  renderEnum(definition) {
    const { values, valueType } = definition.config;
    const members = [];
    const enumName = [this.schema.name, definition.attribute, 'Enum']
      .map(formatName)
      .join('');

    let currentIndex = 0;
    let currentChar = 65;

    switch (normalizeType(valueType)) {
      // If a string is provided
      // Assign values incrementally starting from 0
      case 'string':
        values.forEach(value => {
          members.push(`${indent(1)}${value} = ${currentIndex}`);
          currentIndex++;
        });
        break;

      // If a number or boolean is provided
      // Generate unique keys using the alphabet
      case 'number':
      case 'boolean':
        values.forEach(value => {
          members.push(`${indent(1)}${String.fromCodePoint(currentChar)} = ${Number(value)}`);
          currentChar++;
        });
        break;

      default:
        break;
    }

    this.header.push(`export enum ${enumName} ${this.formatObject(members, 0, ',\n')}`);

    return enumName;
  }

  /**
   * {@inheritDoc}
   */
  renderFunc(definition, depth) {
    const returnType = definition.returnType
      ? this.renderAttribute(definition.returnType, depth + 1)
      : 'void';

    const argTypes = definition.argTypes
      // eslint-disable-next-line newline-per-chained-call
      ? this.renderObjectProps(definition.argTypes).join(' ').replace(/,$/, '')
      : '';

    return `(${argTypes}) => ${returnType}`;
  }

  /**
   * {@inheritDoc}
   */
  renderInstance(definition) {
    return this.formatValue(definition.config.contract, 'function');
  }

  /**
   * {@inheritDoc}
   */
  renderNumber() {
    return 'number';
  }

  /**
   * {@inheritDoc}
   */
  renderObject(definition, depth) {
    const key = this.renderAttribute(definition.keyType, depth);
    const value = this.renderAttribute(definition.valueType, depth);

    return this.formatObject(`[key: ${key}]: ${value}`, 0, ' ', ' ');
  }

  /**
   * {@inheritDoc}
   */
  renderShape(definition, depth) {
    return this.formatObject(this.renderObjectProps(definition.attributes, depth + 1, ';'), depth);
  }

  /**
   * {@inheritDoc}
   */
  renderUnion(definition, depth) {
    return definition.valueTypes
      .map(item => {
        const value = this.renderAttribute(item, depth);

        // Functions need to be wrapped in parenthesis when used in unions
        return (item instanceof FuncDefinition) ? `(${value})` : value;
      })
      .join(' | ');
  }

  /**
   * {@inheritDoc}
   */
  renderString() {
    return 'string';
  }

  /**
   * Mark as optional.
   *
   * @param {Definition} definition
   * @returns {String}
   */
  wrapPropertyName(definition) {
    const template = definition.attribute;

    if (!definition.isRequired()) {
      return `${template}?`;
    }

    return template;
  }
}
