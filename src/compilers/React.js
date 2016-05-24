import Compiler from '../Compiler';
import indent from '../helpers/indent';

export default class ReactCompiler extends Compiler {
    compile() {
        let fields = this.compileFields(this.schema.fields);

        return `const ${this.getResourceName()} = PropTypes.shape({\n${fields.join(',\n')}\n});`;
    }

    renderBool(field, definition) {
        return this.wrapProperty(field, definition, 'bool');
    }

    renderEnum(field, definition) {
        let { values, valueType } = definition.config;

        return this.wrapProperty(field, definition,
          this.wrapFunction('oneOf', this.formatArray(values, valueType)));
    }

    renderFunc(field, definition) {
        return this.wrapProperty(field, definition, 'func');
    }

    renderInstance(field, definition) {
        return this.wrapProperty(field, definition,
          this.wrapFunction('instanceOf', this.formatValue(definition.config.contract, 'function')));
    }

    renderNumber(field, definition) {
        return this.wrapProperty(field, definition, 'number');
    }

    renderString(field, definition) {
        return this.wrapProperty(field, definition, 'string');
    }

    wrapFunction(name, args = '') {
        return `${name}(${args})`;
    }

    wrapProperty(field, definition, template, depth = 1) {
        let response = `${indent(depth)}${field}: PropTypes.${template}`;

        if (definition.isRequired()) {
            response += '.isRequired';
        }

        return response;
    }
}
