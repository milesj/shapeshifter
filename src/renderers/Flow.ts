/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
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
import { Config, Options } from '../types';

export default class FlowRenderer extends Renderer {
  suffix: string = 'Type';

  afterParse() {
    this.builder.comments.add('/* @flow */');
  }

  render(setName: string, attributes: Definition<Config>[] = []): string {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1), 0);

    return `export type ${setName} = ${shape};`;
  }

  renderArray(definition: ArrayDefinition, depth: number): string {
    return this.wrapNullable(
      definition,
      this.wrapGenerics(
        'Array',
        definition.valueType ? this.renderAttribute(definition.valueType, depth) : 'any',
      ),
    );
  }

  renderBool(definition: BoolDefinition): string {
    return this.wrapNullable(definition, 'boolean');
  }

  renderEnum(definition: EnumDefinition, depth: number): string {
    const { values, valueType } = definition.config;

    return values.map(item => this.renderOrFormat(item, depth, valueType)).join(' | ');
  }

  renderInstance(definition: InstanceDefinition): string {
    return this.wrapNullable(definition, this.formatValue(definition.config.contract, 'function'));
  }

  renderNumber(definition: NumberDefinition): string {
    return this.wrapNullable(definition, 'number');
  }

  renderObject(definition: ObjectDefinition, depth: number): string {
    const key = definition.keyType ? this.renderAttribute(definition.keyType, depth) : 'string';
    const value = definition.valueType ? this.renderAttribute(definition.valueType, depth) : 'any';

    return this.wrapNullable(definition, this.formatObject(`[key: ${key}]: ${value}`, 0, ' ', ' '));
  }

  renderReference(definition: ReferenceDefinition): string {
    return this.wrapNullable(definition, super.renderReference(definition));
  }

  renderShape(definition: ShapeDefinition, depth: number): string {
    const reference = this.renderShapeReference(definition);

    if (reference) {
      return this.wrapNullable(definition, reference);
    }

    if (!definition.attributes) {
      return this.wrapNullable(definition, 'Object');
    }

    return this.wrapNullable(
      definition,
      this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth),
    );
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
  wrapNullable(definition: Definition<Config>, template: string): string {
    if (definition.isNullable()) {
      return `?${template}`;
    }

    return template;
  }
}
