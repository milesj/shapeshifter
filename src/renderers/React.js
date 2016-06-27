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
    return `export const ${this.getSchemaName(setName)} = ${this.renderShape({ attributes }, 0)};`;
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
    let response = `PropTypes.${template}`;

    if (definition.isRequired && definition.isRequired()) {
      response += '.isRequired';
    }

    return response;
  }
}
