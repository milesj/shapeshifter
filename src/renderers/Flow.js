import Renderer from '../Renderer';
import isPrimitive from '../helpers/isPrimitive';

export default class FlowRenderer extends Renderer {
  /**
   * {@inheritDoc}
   */
  beforeParse() {
    this.imports.push('// @flow');
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
    const configType = definition.valueType.config.type;
    let template = this.renderAttribute(definition.valueType, depth);

    if (isPrimitive(configType) || configType === 'instance') {
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
  renderFunc(definition, depth) {
    const returnType = definition.returnType
        ? this.renderAttribute(definition.returnType, depth + 1)
        : 'void';

    const argTypes = definition.argTypes
        // eslint-disable-next-line newline-per-chained-call
        ? this.renderObjectProps(definition.argTypes).join(' ').trim().replace(/,$/, '')
        : '';

    return this.wrapNullable(definition, `(${argTypes}) => ${returnType}`);
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
    const key = this.renderAttribute(definition.keyType, depth);
    const value = this.renderAttribute(definition.valueType, depth);

    return this.wrapNullable(definition,
      this.formatObject(`[key: ${key}]: ${value}`, 0, ' ', ' '));
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
    return definition.valueTypes
      .map(item => this.renderAttribute(item, depth))
      .join(' | ');
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
