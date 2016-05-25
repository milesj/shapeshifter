import config from './config';
import Definition from './Definition';
import ArrayDef from './definitions/Array';
import BoolDef from './definitions/Bool';
import EnumDef from './definitions/Enum';
import FuncDef from './definitions/Func';
import InstanceDef from './definitions/Instance';
import NumberDef from './definitions/Number';
import ObjectDef from './definitions/Object';
import ShapeDef from './definitions/Shape';
import StringDef from './definitions/String';
import UnionDef from './definitions/Union';
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

        } else if (definition instanceof UnionDef) {
            return this.renderUnion(definition, depth);
        }
    }

    compileArrayItems(items, depth = 0, valueType) {
        return items.map(item => (
            indent(depth) + this.wrapItem(this.compileOrFormat(item, depth, valueType))
        ));
    }

    compileObjectProps(props, depth = 0) {
        return props.map(prop => (
            indent(depth) + this.wrapProperty(prop.attribute, this.compileOrFormat(prop, depth))
        ));
    }

    compileOrFormat(value, depth, valueType) {
        return (value instanceof Definition)
          ? this.compileAttribute(value, depth)
          : this.formatValue(value, valueType)
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
        type = type || typeof value;

        switch (type) {
            case 'string':
                return `'${value}'`;

            case 'function':
            case 'boolean':
                return `${value}`;

            case 'number':
                return parseFloat(value);

            default:
                throw new TypeError(`Unknown type "${type}" passed to formatValue().`);
        }
    }

    getSchemaName(format = '') {
        return this.schema.name + format + config.schemaSuffix;
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
