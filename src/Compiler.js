import config from './config';
import ArrayDef from './definitions/Array';
import BoolDef from './definitions/Bool';
import EnumDef from './definitions/Enum';
import FuncDef from './definitions/Func';
import InstanceDef from './definitions/Instance';
import NumberDef from './definitions/Number';
import ObjectDef from './definitions/Object';
import ShapeDef from './definitions/Shape';
import StringDef from './definitions/String';

export default class Compiler {
    constructor(schema) {
        this.schema = schema;
    }

    compileFields(fields) {
        let compiledFields = [];

        Object.keys(fields).forEach(field => {
            let definition = fields[field],
                compiledField;

            if (definition instanceof BoolDef) {
                compiledField = this.renderBool(field, definition);

            } else if (definition instanceof EnumDef) {
                compiledField = this.renderEnum(field, definition);

            } else if (definition instanceof FuncDef) {
                compiledField = this.renderFunc(field, definition);

            } else if (definition instanceof NumberDef) {
                compiledField = this.renderNumber(field, definition);

            } else if (definition instanceof StringDef) {
                compiledField = this.renderString(field, definition);
            }

            compiledFields.push(compiledField);
        });

        return compiledFields;
    }

    formatArray(values, type) {
        let array = values.map(value => this.formatValue(value, type)).join(', ');

        return `[${array}]`;
    }

    formatValue(value, type) {
        switch (type || typeof value) {
            case 'string':
                return `'${value}'`;
            case 'function':
                return `${value}`;
            case 'number':
                return parseFloat(value);
            default:
                throw new TypeError('Unknown type passed to `formatValue()`.');
        }
    }

    getResourceName(subResource = '') {
        return this.schema.name + subResource + config.schemaSuffix;
    }
}
