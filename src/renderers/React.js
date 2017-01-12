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
import FuncDefinition from '../definitions/Func';
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

  /**
   * {@inheritDoc}
   */
  beforeParse() {
    this.imports.push('import { PropTypes } from \'react\';');
  }

  /**
   * {@inheritDoc}
   */
  render(setName: string, attributes: Definition[] = []) {
    const shape = this.formatObject(this.renderObjectProps(attributes, 1), 0);

    return `export const ${setName} = PropTypes.shape(${shape});`;
  }

  /**
   * {@inheritDoc}
   */
  renderArray(definition: ArrayDefinition, depth: number): string {
    return this.wrapPropType(definition,
      this.wrapFunction('arrayOf', this.renderAttribute(definition.valueType, depth)));
  }

  /**
   * {@inheritDoc}
   */
  renderBool(definition: BoolDefinition): string {
    return this.wrapPropType(definition, 'bool');
  }

  /**
   * {@inheritDoc}
   */
  renderEnum(definition: EnumDefinition, depth: number): string {
    const { values, valueType } = definition.config;

    return this.wrapPropType(definition,
      this.wrapFunction('oneOf',
        this.formatArray(this.renderArrayItems(values, depth + 1, valueType), depth),
      ),
    );
  }

  /**
   * {@inheritDoc}
   */
  renderFunc(definition: FuncDefinition, depth: number): string {
    return this.wrapPropType(definition, 'func');
  }

  /**
   * {@inheritDoc}
   */
  renderInstance(definition: InstanceDefinition): string {
    const { contract } = definition.config;

    return this.wrapPropType(definition,
      this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
  }

  /**
   * {@inheritDoc}
   */
  renderNumber(definition: NumberDefinition): string {
    return this.wrapPropType(definition, 'number');
  }

  /**
   * {@inheritDoc}
   */
  renderObject(definition: ObjectDefinition, depth: number): string {
    return this.wrapPropType(definition,
      this.wrapFunction('objectOf', this.renderAttribute(definition.valueType, depth)));
  }

  /**
   * {@inheritDoc}
   */
  renderReference(definition: ReferenceDefinition): string {
    const { self, subset } = definition.config;
    const reference = super.renderReference(definition);

    // Wrap a function as we need to defer the variable reference
    if (self && !subset) {
      return `(...args) => ${this.wrapRequired(definition, `${reference}(...args)`)}`;
    }

    return this.wrapRequired(definition, reference);
  }

  /**
   * {@inheritDoc}
   */
  renderShape(definition: ShapeDefinition, depth: number): string {
    const reference = this.renderShapeReference(definition);

    if (reference) {
      return this.wrapRequired(definition, reference);
    }

    return this.wrapPropType(definition,
      this.wrapFunction('shape',
        this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth),
      ),
    );
  }

  /**
   * {@inheritDoc}
   */
  renderString(definition: StringDefinition): string {
    return this.wrapPropType(definition, 'string');
  }

  /**
   * {@inheritDoc}
   */
  renderUnion(definition: UnionDefinition, depth: number): string {
    return this.wrapPropType(definition,
      this.wrapFunction('oneOfType',
        this.formatArray(this.renderArrayDefinitions(definition.valueTypes, depth + 1), depth),
      ),
    );
  }

  /**
   * Render a definition into an React PropType representation.
   *
   * @param {Definition} definition
   * @param {String} template
   * @returns {String}
   */
  wrapPropType(definition: Definition, template: string): string {
    return this.wrapRequired(definition, `PropTypes.${template}`);
  }

  /**
   * Wrap a definition template with required if applicable.
   *
   * @param {Definition} definition
   * @param {String} template
   * @returns {String}
   */
  wrapRequired(definition: Definition, template: string): string {
    if (definition.isRequired && definition.isRequired()) {
      return `${template}.isRequired`;
    }

    return template;
  }
}
