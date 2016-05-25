import Compiler from '../Compiler';
import indent from '../helpers/indent';

export default class ReactCompiler extends Compiler {
    compile() {
        let attributes = this.schema.attributes;

        return `const ${this.getResourceName()} = ${this.renderShape({ attributes })};`;
    }

    renderArray(definition) {
        return this.wrapPropType(definition,
            this.wrapFunction('arrayOf', this.compileAttribute(definition.valueType)));
    }

    renderBool(definition) {
        return this.wrapPropType(definition, 'bool');
    }

    renderEnum(definition, depth = 0) {
        let { values, valueType } = definition.config;

        return this.wrapPropType(definition,
            this.wrapFunction('oneOf', this.formatArray(
                this.compileArrayItems(values, valueType, depth + 1), depth)));
    }

    renderFunc(definition) {
        return this.wrapPropType(definition, 'func');
    }

    renderInstance(definition) {
        let { contract } = definition.config;

        return this.wrapPropType(definition,
            this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
    }

    renderNumber(definition) {
        return this.wrapPropType(definition, 'number');
    }

    renderObject(definition) {
        return this.wrapPropType(definition,
            this.wrapFunction('objectOf', this.compileAttribute(definition.valueType)));
    }

    renderShape(definition, depth = 0) {
        return this.wrapPropType(definition,
            this.wrapFunction('shape', this.formatObject(
                this.compileObjectProps(definition.attributes, depth + 1), depth)));
    }

    renderString(definition) {
        return this.wrapPropType(definition, 'string');
    }

    wrapPropType(definition, template) {
        let response = `PropTypes.${template}`;

        if (definition.isRequired && definition.isRequired()) {
            response += '.isRequired';
        }

        return response;
    }
}
