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
        return this.wrapProperty(field, definition, this.wrapFunction('oneOf',
          this.formatArray(definition.config.values, definition.config.valueType)
        ));
    }

    renderFunc(field, definition) {
        return this.wrapProperty(field, definition, 'func');
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

    wrapIsRequired(template, definition) {
        return definition.isRequired() ? `${template}.isRequired` : template;
    }

    wrapProperty(field, definition, template, depth = 1) {
        return this.wrapIsRequired(`${indent(depth)}${field}: PropTypes.${template}`, definition);
    }
}
