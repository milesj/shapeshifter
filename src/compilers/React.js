import Compiler from '../Compiler';
import indent from '../helpers/indent';
import config from '../config';

export default class ReactCompiler extends Compiler {
    compile() {
        let fields = this.compileFields();

        return `const ${this.schema.name + config.schemaSuffix} = PropTypes.shape({\n${fields.join(',\n')}\n});`;
    }

    renderBool(field, definition) {
        return this.wrapProperty(field, definition, 'bool');
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

    wrapIsRequired(template, definition) {
        return definition.isRequired() ? `${template}.isRequired` : template;
    }

    wrapProperty(field, definition, template, depth = 1) {
        return this.wrapIsRequired(`${indent(depth)}${field}: PropTypes.${template}`, definition);
    }
}
