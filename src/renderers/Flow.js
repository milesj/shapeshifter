/**
 * @copyright   2016-2017, Miles Johnson
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

  afterParse() {
    this.imports.unshift('// @flow');
  }

  render(setName: string, attributes: Definition[] = []): string {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1), 0);

    return `export type ${setName} = ${shape};`;
  }

  renderArray(definition: ArrayDefinition, depth: number): string {
    return this.wrapNullable(definition,
      this.wrapGenerics('Array', this.renderAttribute(definition.valueType, depth)));
  }

  renderBool(definition: BoolDefinition): string {
    return this.wrapNullable(definition, 'boolean');
  }

  renderEnum(definition: EnumDefinition, depth: number): string {
    const { values, valueType } = definition.config;

    return values
      .map(item => this.renderOrFormat(item, depth, valueType))
      .join(' | ');
  }

  renderInstance(definition: InstanceDefinition): string {
    return this.wrapNullable(definition, this.formatValue(definition.config.contract, 'function'));
  }

  renderNumber(definition: NumberDefinition): string {
    return this.wrapNullable(definition, 'number');
  }

  renderObject(definition: ObjectDefinition, depth: number): string {
    const key = this.renderAttribute(definition.keyType, depth);
    const value = this.renderAttribute(definition.valueType, depth);

    return this.wrapNullable(definition,
      this.formatObject(`[key: ${key}]: ${value}`, 0, ' ', ' '));
  }

  renderReference(definition: ReferenceDefinition): string {
    return this.wrapNullable(definition, super.renderReference(definition));
  }

  renderShape(definition: ShapeDefinition, depth: number): string {
    return this.wrapNullable(definition,
      this.renderShapeReference(definition) ||
      this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth));
  }

  renderString(definition: StringDefinition): string {
    return this.wrapNullable(definition, 'string');
  }

  renderUnion(definition: UnionDefinition, depth: number): string {
    const set = new Set(definition.valueTypes.map(item => this.renderAttribute(item, depth)));

    return Array.from(set.values()).join(' | ');
  }

  /**
   * Render a definition and wrap for Flow nullable support.
   */
  wrapNullable(definition: Definition, template: string): string {
    if (definition.isNullable && definition.isNullable()) {
      return `?${template}`;
    }

    return template;
  }
}
