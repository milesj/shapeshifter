/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Renderer from '../Renderer';
import Schematic from '../Schematic';
import Definition from '../Definition';
import ArrayDefinition from '../definitions/Array';
import BoolDefinition from '../definitions/Bool';
import EnumDefinition from '../definitions/Enum';
import InstanceDefinition from '../definitions/Instance';
import NumberDefinition from '../definitions/Number';
import ObjectDefinition from '../definitions/Object';
import ReferenceDefinition from '../definitions/Reference';
import ShapeDefinition from '../definitions/Shape';
import StringDefinition from '../definitions/String';
import UnionDefinition from '../definitions/Union';

import type { Options } from '../types';

export default class FlowRenderer extends Renderer {
  constructor(options: Options, schematic: Schematic) {
    super(options, schematic);

    this.suffix = 'Type';
  }

  /**
   * {@inheritDoc}
   */
  afterParse() {
    this.imports.unshift('// @flow');
  }

  /**
   * {@inheritDoc}
   */
  render(setName: string, attributes: Definition[] = []) {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1), 0);

    return `export type ${setName} = ${shape};`;
  }

  /**
   * {@inheritDoc}
   */
  renderArray(definition: ArrayDefinition, depth: number): string {
    return this.wrapNullable(definition,
      this.wrapGenerics('Array', this.renderAttribute(definition.valueType, depth)));
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
      this.renderShapeReference(definition) ||
      this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth),
    );
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
    const set = new Set(definition.valueTypes.map(item => this.renderAttribute(item, depth)));

    return Array.from(set.values()).join(' | ');
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
