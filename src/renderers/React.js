/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Renderer from '../Renderer';

export default class ReactRenderer extends Renderer {
  /**
   * {@inheritDoc}
   */
  beforeParse() {
    this.imports.push('import { PropTypes } from \'react\';');
  }

  /**
   * {@inheritDoc}
   */
  render(setName, attributes = {}) {
    return `export const ${this.getObjectName(setName)} = ${this.renderShape({ attributes }, 0)};`;
  }

  /**
   * {@inheritDoc}
   */
  renderArray(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('arrayOf', this.renderAttribute(definition.valueType, depth)));
  }

  /**
   * {@inheritDoc}
   */
  renderBool(definition) {
    return this.wrapPropType(definition, 'bool');
  }

  /**
   * {@inheritDoc}
   */
  renderEnum(definition, depth) {
    const { values, valueType } = definition.config;

    return this.wrapPropType(definition,
      this.wrapFunction('oneOf',
        this.formatArray(this.renderArrayItems(values, depth + 1, valueType), depth)
      )
    );
  }

  /**
   * {@inheritDoc}
   */
  renderFunc(definition) {
    return this.wrapPropType(definition, 'func');
  }

  /**
   * {@inheritDoc}
   */
  renderInstance(definition) {
    const { contract } = definition.config;

    return this.wrapPropType(definition,
      this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
  }

  /**
   * {@inheritDoc}
   */
  renderNumber(definition) {
    return this.wrapPropType(definition, 'number');
  }

  /**
   * {@inheritDoc}
   */
  renderObject(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('objectOf', this.renderAttribute(definition.valueType, depth)));
  }

  /**
   * {@inheritDoc}
   */
  renderReference(definition) {
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
  renderShape(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('shape',
        this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth)
      )
    );
  }

  /**
   * {@inheritDoc}
   */
  renderUnion(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('oneOfType',
        this.formatArray(this.renderArrayItems(definition.valueTypes, depth + 1), depth)
      )
    );
  }

  /**
   * {@inheritDoc}
   */
  renderString(definition) {
    return this.wrapPropType(definition, 'string');
  }

  /**
   * Render a definition into an React PropType representation.
   *
   * @param {Definition|Object} definition
   * @param {String} template
   * @returns {String}
   */
  wrapPropType(definition, template) {
    return this.wrapRequired(definition, `PropTypes.${template}`);
  }

  /**
   * Wrap a definition template with required if applicable.
   *
   * @param {Definition|Object} definition
   * @param {String} template
   * @returns {String}
   */
  wrapRequired(definition, template) {
    if (definition.isRequired && definition.isRequired()) {
      return `${template}.isRequired`;
    }

    return template;
  }
}
