import Compiler from '../Compiler';
import indent from '../helpers/indent';

export default class ReactCompiler extends Compiler {
    compile() {
        let fields = this.schema.fields.map(definition => {
            return this.wrapProperty(definition.field, this.compileField(definition));
        });

        return `const ${this.getResourceName()} = PropTypes.shape({\n${fields.join('\n')}\n});`;
    }

    renderArray(definition) {
        return this.wrapPropType(definition,
            this.wrapFunction('arrayOf', this.compileField(definition.valueType)));
    }

    renderBool(definition) {
        return this.wrapPropType(definition, 'bool');
    }

    renderEnum(definition) {
        let { values, valueType } = definition.config;

        return this.wrapPropType(definition,
          this.wrapFunction('oneOf', this.formatArray(values, valueType)));
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
          this.wrapFunction('objectOf', this.compileField(definition.valueType)));
    }

    renderString(definition) {
        return this.wrapPropType(definition, 'string');
    }

    wrapFunction(name, args = '') {
        return `${name}(${args})`;
    }

    wrapProperty(key, value, depth = 1) {
        return `${indent(depth)}${key}: ${value},`;
    }

    wrapPropType(definition, template) {
        let response = `PropTypes.${template}`;

        if (definition.isRequired()) {
            response += '.isRequired';
        }

        return response;
    }
}
