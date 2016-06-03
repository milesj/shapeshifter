import Renderer from '../Renderer';

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
    return this.wrapNullable(definition, 'Array<T>'); // TODO
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
    return ''; // TODO
  }

  /**
   * {@inheritDoc}
   */
  renderShape(definition, depth) {
    return this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth);
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
