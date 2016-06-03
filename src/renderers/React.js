import Renderer from '../Renderer';

export default class ReactRenderer extends Renderer {
  /**
   * {@inheritDoc}
   */
  getHeader() {
    return 'import { PropTypes } from \'react\';';
  }

  /**
   * {@inheritDoc}
   */
  render(setName, attributes = {}) {
    return `export const ${this.getSchemaName(setName)} = ${this.renderShape({ attributes }, 0)};`;
  }

  /**
   * Render a `React.PropType.arrayOf()` definition.
   *
   * @param {ArrayDefinition} definition
   * @param {Number} depth
   * @returns {String}
   */
  renderArray(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('arrayOf', this.renderAttribute(definition.valueType, depth)));
  }

  /**
   * Render a `React.PropType.bool` definition.
   *
   * @param {BoolDefinition} definition
   * @returns {String}
   */
  renderBool(definition) {
    return this.wrapPropType(definition, 'bool');
  }

  /**
   * Render a `React.PropType.oneOf()` definition.
   *
   * @param {EnumDefinition} definition
   * @param {Number} depth
   * @returns {String}
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
   * Render a `React.PropType.func` definition.
   *
   * @param {FuncDefinition} definition
   * @returns {String}
   */
  renderFunc(definition) {
    return this.wrapPropType(definition, 'func');
  }

  /**
   * Render a `React.PropType.instanceOf()` definition.
   *
   * @param {InstanceDefinition} definition
   * @returns {String}
   */
  renderInstance(definition) {
    const { contract } = definition.config;

    return this.wrapPropType(definition,
      this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
  }

  /**
   * Render a `React.PropType.number` definition.
   *
   * @param {NumberDefinition} definition
   * @returns {String}
   */
  renderNumber(definition) {
    return this.wrapPropType(definition, 'number');
  }

  /**
   * Render a `React.PropType.arrayOf()` definition.
   *
   * @param {ObjectDefinition} definition
   * @param {Number} depth
   * @returns {String}
   */
  renderObject(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('objectOf', this.renderAttribute(definition.valueType, depth)));
  }

  /**
   * Render a `React.PropType.shape()` definition.
   *
   * @param {ShapeDefinition} definition
   * @param {Number} depth
   * @returns {String}
   */
  renderShape(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('shape',
        this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth)
      )
    );
  }

  /**
   * Render a `React.PropType.oneOfType()` definition.
   *
   * @param {UnionDefinition} definition
   * @param {Number} depth
   * @returns {String}
   */
  renderUnion(definition, depth) {
    return this.wrapPropType(definition,
      this.wrapFunction('oneOfType',
        this.formatArray(this.renderArrayItems(definition.valueTypes, depth + 1), depth)
      )
    );
  }

  /**
   * Render a `React.PropType.string` definition.
   *
   * @param {StringDefinition} definition
   * @returns {String}
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
