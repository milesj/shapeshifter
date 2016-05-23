import Compiler from '../Compiler';
import indent from '../helpers/indent';
import config from '../config';

export default class FlowCompiler extends Compiler {
    compile() {
        let fields = this.compileFields();

        return `type ${this.schema.name + config.schemaSuffix} = {\n${fields.join(';\n')}\n};`;
    }

    renderBool(field, definition) {
        return this.wrapProperty(field, definition, 'boolean');
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

    wrapProperty(field, definition, template, depth = 1) {
        return `${indent(depth)}${field}${definition.isNullable() ? '?' : ''}: ${template}`;
    }
}
