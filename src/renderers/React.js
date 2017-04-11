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

export default class ReactRenderer extends Renderer {
  constructor(options: Options, schematic: Schematic) {
    super(options, schematic);

    this.suffix = 'Shape';
  }

  beforeParse() {
    this.imports.push('import PropTypes from \'prop-types\';');
  }

  render(setName: string, attributes: Definition[] = []) {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1), 0);

    return `export const ${setName} = PropTypes.shape(${shape});`;
  }

  renderArray(definition: ArrayDefinition, depth: number): string {
    return this.wrapPropType(definition,
      this.wrapFunction('arrayOf', this.renderAttribute(definition.valueType, depth)));
  }

  renderBool(definition: BoolDefinition): string {
    return this.wrapPropType(definition, 'bool');
  }

  renderEnum(definition: EnumDefinition, depth: number): string {
    const { values, valueType } = definition.config;

    return this.wrapPropType(definition,
      this.wrapFunction('oneOf',
        this.formatArray(this.renderArrayItems(values, depth + 1, valueType), depth),
      ),
    );
  }

  renderInstance(definition: InstanceDefinition): string {
    const { contract } = definition.config;

    return this.wrapPropType(definition,
      this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
  }

  renderNumber(definition: NumberDefinition): string {
    return this.wrapPropType(definition, 'number');
  }

  renderObject(definition: ObjectDefinition, depth: number): string {
    return this.wrapPropType(definition,
      this.wrapFunction('objectOf', this.renderAttribute(definition.valueType, depth)));
  }

  renderReference(definition: ReferenceDefinition): string {
    const { self, subset } = definition.config;
    const reference = super.renderReference(definition);

    // Wrap a function as we need to defer the variable reference
    if (self && !subset) {
      return `(...args) => ${this.wrapNullable(definition, `${reference}(...args)`)}`;
    }

    return this.wrapNullable(definition, reference);
  }

  renderShape(definition: ShapeDefinition, depth: number): string {
    const reference = this.renderShapeReference(definition);

    if (reference) {
      return this.wrapNullable(definition, reference);
    }

    return this.wrapPropType(definition,
      this.wrapFunction('shape',
        this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth),
      ),
    );
  }

  renderString(definition: StringDefinition): string {
    return this.wrapPropType(definition, 'string');
  }

  renderUnion(definition: UnionDefinition, depth: number): string {
    return this.wrapPropType(definition,
      this.wrapFunction('oneOfType',
        this.formatArray(this.renderArrayDefinitions(definition.valueTypes, depth + 1), depth),
      ),
    );
  }

  /**
   * Render a definition into an React PropType representation.
   */
  wrapPropType(definition: Definition, template: string): string {
    return this.wrapNullable(definition, `PropTypes.${template}`);
  }

  /**
   * Wrap a definition template with required if applicable.
   */
  wrapNullable(definition: Definition, template: string): string {
    if (definition.isNullable && !definition.isNullable()) {
      return `${template}.isRequired`;
    }

    return template;
  }
}
