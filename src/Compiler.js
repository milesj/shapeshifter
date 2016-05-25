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

    compileAttribute(definition, depth = 0) {
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

    compileArrayItems(items, valueType, depth = 0) {
        return items.map(item => (
            indent(depth) + this.wrapItem(this.formatValue(item, valueType))
        ));
    }

    compileObjectProps(attributes, depth = 0) {
        return attributes.map(definition => (
            indent(depth) + this.wrapProperty(definition.attribute, this.compileAttribute(definition, depth))
        ));
    }

    formatArray(items, depth) {
        if (Array.isArray(items)) {
            items = items.join('\n');
        }

        return `[\n${items}\n${indent(depth)}]`;
    }

    formatObject(props, depth) {
        if (Array.isArray(props)) {
            props = props.join('\n');
        }

        return `{\n${props}\n${indent(depth)}}`;
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

    wrapFunction(name, args = '') {
        return `${name}(${args})`;
    }

    wrapItem(value) {
        return `${value},`;
    }

    wrapProperty(key, value) {
        return `${key}: ${value},`;
    }
}
