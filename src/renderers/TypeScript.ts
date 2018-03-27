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
import ShapeDefinition from '../definitions/Shape';
import StringDefinition from '../definitions/String';
import UnionDefinition from '../definitions/Union';
import indent from '../helpers/indent';
import isPrimitive from '../helpers/isPrimitive';
import normalizeType from '../helpers/normalizeType';
import { Config, Options, PrimitiveType } from '../types';

const ASCII_ALPHA_START: number = 65;

export default class TypeScriptRenderer extends Renderer {
  constructor(options: Options, schematic: Schematic) {
    super(options, schematic);

    this.suffix = 'Interface';
  }

  render(setName: string, attributes: Definition<Config>[] = []): string {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1, ';'), 0);

    return `export interface ${setName} ${shape}`;
  }

  renderArray(definition: ArrayDefinition, depth: number): string {
    if (!definition.valueType) {
      return 'any[]';
    }

    const configType = definition.valueType.config.type;
    let template = this.renderAttribute(definition.valueType, depth);

    if (isPrimitive(configType) || configType === 'instance') {
      template += '[]';
    } else {
      template = this.wrapGenerics('Array', template);
    }

    return template;
  }

  renderBool(definition: BoolDefinition): string {
    return 'boolean';
  }

  renderEnum(definition: EnumDefinition, depth: number): string {
    const { indentCharacter: char } = this.options;
    const { values, valueType } = definition.config;
    const members: string[] = [];
    const enumName = this.getObjectName(this.schematic.name, definition.attribute, 'Enum');
    let currentIndex = 0;
    let currentChar = ASCII_ALPHA_START;

    switch (normalizeType(valueType)) {
      // If a string is provided, assign values incrementally starting from 0
      default:
      case 'string':
        values.forEach((value: PrimitiveType) => {
          members.push(`${indent(1, char)}${String(value)} = ${currentIndex}`);
          currentIndex += 1;
        });
        break;

      // If a number or boolean is provided, generate unique keys using the alphabet
      case 'number':
      case 'boolean':
        values.forEach((value: PrimitiveType) => {
          members.push(`${indent(1, char)}${String.fromCodePoint(currentChar)} = ${Number(value)}`);
          currentChar += 1;
        });
        break;
    }

    this.header.push(`export enum ${enumName} ${this.formatObject(members, 0, ',\n')}`);

    return enumName;
  }

  renderInstance(definition: InstanceDefinition): string {
    return this.formatValue(definition.config.contract, 'function');
  }

  renderNumber(definition: NumberDefinition): string {
    return 'number';
  }

  renderObject(definition: ObjectDefinition, depth: number): string {
    const key = definition.keyType ? this.renderAttribute(definition.keyType, depth) : 'string';
    const value = definition.valueType ? this.renderAttribute(definition.valueType, depth) : 'any';

    return this.formatObject(`[key: ${key}]: ${value}`, 0, ' ', ' ');
  }

  renderShape(definition: ShapeDefinition, depth: number): string {
    return (
      this.renderShapeReference(definition) ||
      this.formatObject(this.renderObjectProps(definition.attributes, depth + 1, ';'), depth)
    );
  }

  renderString(definition: StringDefinition): string {
    return 'string';
  }

  renderUnion(definition: UnionDefinition, depth: number): string {
    const set = new Set(definition.valueTypes.map(item => this.renderAttribute(item, depth)));

    return Array.from(set.values()).join(' | ');
  }
}
