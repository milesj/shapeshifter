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

    compileField(definition) {
        if (definition instanceof ArrayDef) {
            return this.renderArray(definition);

        } else if (definition instanceof BoolDef) {
            return this.renderBool(definition);

        } else if (definition instanceof EnumDef) {
            return this.renderEnum(definition);

        } else if (definition instanceof FuncDef) {
            return this.renderFunc(definition);

        } else if (definition instanceof InstanceDef) {
            return this.renderInstance(definition);

        } else if (definition instanceof NumberDef) {
            return this.renderNumber(definition);

        } else if (definition instanceof ObjectDef) {
            return this.renderObject(definition);

        } else if (definition instanceof StringDef) {
            return this.renderString(definition);
        }
    }

    formatArray(array, type) {
        return `[${array.map(value => this.formatValue(value, type)).join(', ')}]`;
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
