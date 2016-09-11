/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Renderer from '../Renderer';
import SchemaReader from '../SchemaReader';
import Definition from '../Definition';
import ArrayDefinition from '../definitions/Array';
import BoolDefinition from '../definitions/Bool';
import EnumDefinition from '../definitions/Enum';
import FuncDefinition from '../definitions/Func';
import InstanceDefinition from '../definitions/Instance';
import NumberDefinition from '../definitions/Number';
import ObjectDefinition from '../definitions/Object';
import ReferenceDefinition from '../definitions/Reference';
import ShapeDefinition from '../definitions/Shape';
import StringDefinition from '../definitions/String';
import UnionDefinition from '../definitions/Union';
import isPrimitive from '../helpers/isPrimitive';

import type { Options } from '../types';

export default class FlowRenderer extends Renderer {
  constructor(options: Options, reader: SchemaReader) {
    super(options, reader);

    this.suffix = 'Type';
  }

  /**
   * {@inheritDoc}
   */
  afterParse(): void {
    this.imports.unshift('// @flow');
  }

  /**
   * {@inheritDoc}
   */
  render(setName: string, attributes: Definition[] = []) {
    const shape = new ShapeDefinition(this.options, setName);
    shape.attributes = attributes;

    return `export type ${setName} = ${this.renderShape(shape, 0)};`;
  }

  /**
   * {@inheritDoc}
   */
  renderArray(definition: ArrayDefinition, depth: number): string {
    const configType = definition.valueType.config.type;
    let template = this.renderAttribute(definition.valueType, depth);

    if (isPrimitive(configType) || configType === 'instance') {
      template += '[]';
    } else {
      template = this.wrapGenerics('Array', template);
    }

    return this.wrapNullable(definition, template);
  }

  /**
   * {@inheritDoc}
   */
  renderBool(definition: BoolDefinition): string {
    return this.wrapNullable(definition, 'boolean');
  }

  /**
   * {@inheritDoc}
   */
  renderEnum(definition: EnumDefinition, depth: number): string {
    const { values, valueType } = definition.config;

    return values
      .map(item => this.renderOrFormat(item, depth, valueType))
      .join(' | ');
  }

  /**
   * {@inheritDoc}
   */
  renderFunc(definition: FuncDefinition, depth: number): string {
    const returnType = definition.returnType
        ? this.renderAttribute(definition.returnType, depth + 1)
        : 'void';

    const argTypes = definition.argTypes
        // eslint-disable-next-line newline-per-chained-call
        ? this.renderObjectProps(definition.argTypes).join(' ').trim().replace(/,$/, '')
        : '';

    return this.wrapNullable(definition, `(${argTypes}) => ${returnType}`);
  }

  /**
   * {@inheritDoc}
   */
  renderInstance(definition: InstanceDefinition): string {
    return this.wrapNullable(definition, this.formatValue(definition.config.contract, 'function'));
  }

  /**
   * {@inheritDoc}
   */
  renderNumber(definition: NumberDefinition): string {
    return this.wrapNullable(definition, 'number');
  }

  /**
   * {@inheritDoc}
   */
  renderObject(definition: ObjectDefinition, depth: number): string {
    const key = this.renderAttribute(definition.keyType, depth);
    const value = this.renderAttribute(definition.valueType, depth);

    return this.wrapNullable(definition,
      this.formatObject(`[key: ${key}]: ${value}`, 0, ' ', ' '));
  }

  /**
   * {@inheritDoc}
   */
  renderReference(definition: ReferenceDefinition): string {
    return this.wrapNullable(definition, super.renderReference(definition));
  }

  /**
   * {@inheritDoc}
   */
  renderShape(definition: ShapeDefinition, depth: number): string {
    return this.wrapNullable(definition,
      this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth));
  }

  /**
   * {@inheritDoc}
   */
  renderString(definition: StringDefinition): string {
    return this.wrapNullable(definition, 'string');
  }

  /**
   * {@inheritDoc}
   */
  renderUnion(definition: UnionDefinition, depth: number): string {
    return definition.valueTypes
      .map(item => this.renderAttribute(item, depth))
      .join(' | ');
  }

  /**
   * Render a definition and wrap for Flow nullable support.
   *
   * @param {Definition|Object} definition
   * @param {String} template
   * @returns {String}
   */
  wrapNullable(definition: Definition, template: string): string {
    if (definition.isNullable && definition.isNullable()) {
      return `?${template}`;
    }

    return template;
  }
}
