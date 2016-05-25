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
import indent from './helpers/indent';

export default class Compiler {
    constructor(schema) {
        this.schema = schema;
    }

    compileField(definition, depth = 0) {
        if (definition instanceof ArrayDef) {
            return this.renderArray(definition, depth);

        } else if (definition instanceof BoolDef) {
            return this.renderBool(definition, depth);

        } else if (definition instanceof EnumDef) {
            return this.renderEnum(definition, depth);

        } else if (definition instanceof FuncDef) {
            return this.renderFunc(definition, depth);

        } else if (definition instanceof InstanceDef) {
            return this.renderInstance(definition, depth);

        } else if (definition instanceof NumberDef) {
            return this.renderNumber(definition, depth);

        } else if (definition instanceof ObjectDef) {
            return this.renderObject(definition, depth);

        } else if (definition instanceof ShapeDef) {
            return this.renderShape(definition, depth);

        } else if (definition instanceof StringDef) {
            return this.renderString(definition, depth);
        }
    }

    compileProperties(fields, depth = 0) {
        return fields.map(definition => (
            this.wrapProperty(definition.field, this.compileField(definition, depth), depth)
        ));
    }

    formatArray(array, type) {
        return `[${array.map(value => this.formatValue(value, type)).join(', ')}]`;
    }

    formatObject(properties, depth) {
        if (Array.isArray(properties)) {
            properties = properties.join('\n');
        }

        return `{\n${properties}\n${indent(depth)}}`;
    }

    formatValue(value, type) {
        switch (type || typeof value) {
            case 'string':
                return `'${value}'`;

            case 'function':
            case 'boolean':
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
