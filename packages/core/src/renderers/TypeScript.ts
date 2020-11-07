import Renderer from '../Renderer';
import Definition from '../Definition';
import ArrayDefinition from '../definitions/Array';
import BoolDefinition from '../definitions/Bool';
import EnumDefinition from '../definitions/Enum';
import InstanceDefinition from '../definitions/Instance';
import KeyDefinition from '../definitions/Key';
import NumberDefinition from '../definitions/Number';
import ObjectDefinition from '../definitions/Object';
import ReferenceDefinition from '../definitions/Reference';
import ShapeDefinition from '../definitions/Shape';
import StringDefinition from '../definitions/String';
import UnionDefinition from '../definitions/Union';
import indent from '../helpers/indent';
import normalizeType from '../helpers/normalizeType';
import { Config, PrimitiveType } from '../types';

const ASCII_ALPHA_START = 65;

export default class TypeScriptRenderer extends Renderer {
  beforeParse() {
    if (this.options.suffix) {
      if (this.options.inferPropTypesShape && this.options.renderers.includes('prop-types')) {
        this.suffix = 'Shape';
      } else {
        this.suffix = 'Interface';
      }
    }
  }

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
    const { enums, indentCharacter: char } = this.options;
    const { values, valueType } = definition.config;

    // Use a union
    if (!enums) {
      return values.map((item) => this.renderOrFormat(item, depth, valueType)).join(' | ');
    }

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

  renderKey(definition: KeyDefinition): string {
    const union = this.renderUnion(definition.keyType!, 0);

    this.builder.header.add(`export type Key = ${union};`);

    return this.wrapNullable(definition, 'Key');
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
      // @ts-expect-error Allow
      return this.renderObject(definition, depth);
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
        new Set(definition.valueTypes.map((item) => this.renderAttribute(item, depth))),
      ).join(' | '),
    );
  }

  wrapNullable(definition: Definition<Config>, template: string): string {
    return definition.isNullable() ? `${template} | null` : template;
  }

  wrapPropertyName(definition: Definition<Config>): string {
    return definition.isOptional() ? `${definition.attribute}?` : definition.attribute;
  }
}
