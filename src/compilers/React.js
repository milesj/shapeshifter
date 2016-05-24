import Compiler from '../Compiler';
import indent from '../helpers/indent';

export default class ReactCompiler extends Compiler {
    compile() {
        let fields = this.compileFields(this.schema.fields);

        return `const ${this.getResourceName()} = PropTypes.shape({\n${fields.join(',\n')}\n});`;
    }

    renderBool(definition) {
        return this.wrapProperty(definition, 'bool');
    }

    renderEnum(definition) {
        let { values, valueType } = definition.config;

        return this.wrapProperty(definition,
          this.wrapFunction('oneOf', this.formatArray(values, valueType)));
    }

    renderFunc(definition) {
        return this.wrapProperty(definition, 'func');
    }

    renderInstance(definition) {
        let { contract } = definition.config;

        return this.wrapProperty(definition,
          this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
    }

    renderNumber(definition) {
        return this.wrapProperty(definition, 'number');
    }

    renderString(definition) {
        return this.wrapProperty(definition, 'string');
    }

    wrapFunction(name, args = '') {
        return `${name}(${args})`;
    }

    wrapProperty(definition, template, depth = 1) {
        let response = `${indent(depth)}${definition.field}: PropTypes.${template}`;

        if (definition.isRequired()) {
            response += '.isRequired';
        }

        return response;
    }
}
