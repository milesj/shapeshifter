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
import indent from '../helpers/indent';
import isPrimitive from '../helpers/isPrimitive';
import normalizeType from '../helpers/normalizeType';
import { Config, Options, PrimitiveType } from '../types';
import DefinitionFactory from '../DefinitionFactory';

const ASCII_ALPHA_START: number = 65;

export default class TypeScriptRenderer extends Renderer {
  suffix: string = 'Interface';

  render(setName: string, attributes: Definition<Config>[] = []): string {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1, ';'), 0);

    return `export interface ${setName} ${shape}`;
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
    const { indentCharacter: char } = this.options;
    const { values, valueType } = definition.config;
    const members: string[] = [];
    const enumName = this.getObjectName(this.schematic.name, definition.attribute, 'Enum');
    let currentChar = ASCII_ALPHA_START;

    switch (normalizeType(valueType)) {
      // If a string is provided, let TS infer the value (which is numeric)
      default:
      case 'string':
        values.forEach((value: PrimitiveType) => {
          members.push(`${indent(1, char)}${String(value)}`);
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

    this.builder.header.add(`export enum ${enumName} ${this.formatObject(members, 0, ',\n')}`);

    return this.wrapNullable(definition, enumName);
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
      return this.wrapNullable(definition, 'object');
    }

    return this.wrapNullable(
      definition,
      this.formatObject(this.renderObjectProps(definition.attributes, depth + 1, ';'), depth),
    );
  }

  renderString(definition: StringDefinition): string {
    return this.wrapNullable(definition, 'string');
  }

  renderUnion(definition: UnionDefinition, depth: number): string {
    return this.wrapNullable(
      definition,
      Array.from(
        new Set(definition.valueTypes.map(item => this.renderAttribute(item, depth))),
      ).join(' | '),
    );
  }

  /**
   * Render a definition and wrap for TypeScript nullable support.
   */
  wrapNullable(definition: Definition<Config>, template: string): string {
    if (definition.isNullable()) {
      return `${template} | null`;
    }

    return template;
  }
}
