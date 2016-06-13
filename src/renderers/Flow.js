import Renderer from '../Renderer';
import isPrimitive from '../helpers/isPrimitive';

export default class FlowRenderer extends Renderer {
  /**
   * {@inheritDoc}
   */
  getHeader() {
    return '// @flow';
  }

  /**
   * {@inheritDoc}
   */
  render(setName, attributes = {}) {
    return `export type ${this.getSchemaName(setName)} = ${this.renderShape({ attributes }, 0)};`;
  }

  /**
   * {@inheritDoc}
   */
  renderArray(definition, depth) {
    let template = this.renderAttribute(definition.valueType, depth);

    if (isPrimitive(definition.valueType.config.type)) {
      template += '[]';
    } else {
      template = this.wrapGenerics('Array', template);
    }

    return this.wrapNullable(definition, template);
  }

  /**
   * {@inheritDoc}
   */
  renderBool(definition) {
    return this.wrapNullable(definition, 'boolean');
  }

  /**
   * {@inheritDoc}
   */
  renderEnum(definition, depth) {
    const { values, valueType } = definition.config;

    return values
      .map(item => this.renderOrFormat(item, depth, valueType))
      .join(' | ');
  }

  /**
   * {@inheritDoc}
   */
  renderFunc(definition) {
    return this.wrapNullable(definition, '() => void'); // TODO
  }

  /**
   * {@inheritDoc}
   */
  renderInstance(definition) {
    return this.wrapNullable(definition, this.formatValue(definition.config.contract, 'function'));
  }

  /**
   * {@inheritDoc}
   */
  renderNumber(definition) {
    return this.wrapNullable(definition, 'number');
  }

  /**
   * {@inheritDoc}
   */
  renderObject(definition, depth) {
    const key = this.renderAttribute(definition.keyType, depth + 1);
    const value = this.renderAttribute(definition.valueType, depth + 1);

    return this.wrapNullable(definition,
      this.formatObject(this.wrapProperty(`[key: ${key}]`, value, depth + 1), depth));
  }

  /**
   * {@inheritDoc}
   */
  renderShape(definition, depth) {
    return this.wrapNullable(definition,
      this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth));
  }

  /**
   * {@inheritDoc}
   */
  renderUnion(definition, depth) {
    return ''; // TODO
  }

  /**
   * {@inheritDoc}
   */
  renderString(definition) {
    return this.wrapNullable(definition, 'string');
  }

  /**
   * Render a definition and wrap for Flow nullable support.
   *
   * @param {Definition|Object} definition
   * @param {String} template
   * @returns {String}
   */
  wrapNullable(definition, template) {
    if (definition.isNullable && definition.isNullable()) {
      return `?${template}`;
    }

    return template;
  }
}
