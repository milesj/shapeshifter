/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

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
import { Config } from '../types';

export default class PropTypesRenderer extends Renderer {
  suffix: string = 'Shape';

  beforeParse() {
    this.builder.imports.add("import PropTypes from 'prop-types';");
  }

  render(setName: string, attributes: Definition<Config>[] = []): string {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1), 0);

    if (this.options.stripPropTypes) {
      return `export const ${setName} = (process.env.NODE_ENV === 'production') ? PropTypes.any : PropTypes.shape(${shape});`;
    }

    return `export const ${setName} = PropTypes.shape(${shape});`;
  }

  renderArray(definition: ArrayDefinition, depth: number): string {
    if (!definition.valueType) {
      return this.wrapPropType(definition, 'array');
    }

    return this.wrapPropType(
      definition,
      this.wrapFunction('arrayOf', this.renderAttribute(definition.valueType, depth)),
    );
  }

  renderBool(definition: BoolDefinition): string {
    return this.wrapPropType(definition, 'bool');
  }

  renderEnum(definition: EnumDefinition, depth: number): string {
    const { values, valueType } = definition.config;

    return this.wrapPropType(
      definition,
      this.wrapFunction(
        'oneOf',
        this.formatArray(this.renderArrayItems(values, depth + 1, valueType), depth),
      ),
    );
  }

  renderInstance(definition: InstanceDefinition): string {
    const { contract } = definition.config;

    return this.wrapPropType(
      definition,
      this.wrapFunction('instanceOf', this.formatValue(contract, 'function')),
    );
  }

  renderKey(definition: KeyDefinition): string {
    const union = this.renderUnion(definition.keyType, 0);

    this.builder.header.add(`export const KeyShape = ${union};`);

    return this.wrapOptional(definition, 'KeyShape');
  }

  renderNumber(definition: NumberDefinition): string {
    return this.wrapPropType(definition, 'number');
  }

  renderObject(definition: ObjectDefinition, depth: number): string {
    if (!definition.valueType) {
      return this.wrapPropType(definition, 'object');
    }

    return this.wrapPropType(
      definition,
      this.wrapFunction('objectOf', this.renderAttribute(definition.valueType, depth)),
    );
  }

  renderReference(definition: ReferenceDefinition): string {
    const { self, subset } = definition.config;
    const reference = super.renderReference(definition);

    // Wrap a function as we need to defer the variable reference
    if (self && !subset) {
      return `(...args) => ${this.wrapOptional(definition, `${reference}(...args)`)}`;
    }

    return this.wrapOptional(definition, reference);
  }

  renderSchemaGenerics(): string {
    return ''; // Not supported
  }

  renderShape(definition: ShapeDefinition, depth: number): string {
    const reference = this.renderShapeReference(definition);

    if (reference) {
      return this.wrapOptional(definition, reference);
    }

    if (!definition.attributes) {
      return this.wrapPropType(definition, 'object');
    }

    return this.wrapPropType(
      definition,
      this.wrapFunction(
        'shape',
        this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth),
      ),
    );
  }

  renderString(definition: StringDefinition): string {
    return this.wrapPropType(definition, 'string');
  }

  renderUnion(definition: UnionDefinition, depth: number): string {
    return this.wrapPropType(
      definition,
      this.wrapFunction(
        'oneOfType',
        this.formatArray(this.renderArrayDefinitions(definition.valueTypes, depth + 1), depth),
      ),
    );
  }

  /**
   * Render a definition into a PropType representation.
   */
  wrapPropType(definition: Definition<Config>, template: string): string {
    return this.wrapOptional(definition, `PropTypes.${template}`);
  }

  /**
   * Wrap a definition template with required if applicable.
   */
  wrapOptional(definition: Definition<Config>, template: string): string {
    return definition.isNullable() || definition.isOptional() ? template : `${template}.isRequired`;
  }
}
