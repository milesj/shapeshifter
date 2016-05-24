import isObject from './helpers/isObject';
import isPrimitive from './helpers/isPrimitive';
import isSupported from './helpers/isSupported';
import ArrayDef from './definitions/Array';
import BoolDef from './definitions/Bool';
import EnumDef from './definitions/Enum';
import FuncDef from './definitions/Func';
import InstanceDef from './definitions/Instance';
import NumberDef from './definitions/Number';
import ObjectDef from './definitions/Object';
import ShapeDef from './definitions/Shape';
import StringDef from './definitions/String';

export default class Schema {
    constructor(json) {
        let schema = {};

        if (typeof json === 'string') {
            schema = JSON.parse(json);
        } else if (isObject(json)) {
            schema = json;
        } else {
            throw new SyntaxError('Parse requires a valid JSON structure.');
        }

        if (!schema.name) {
            throw new Error('No name found in schema.');
        } else if (!schema.fields || !Object.keys(schema.fields).length) {
            throw new Error('No fields found in schema.')
        }

        this.schema = schema;
        this.name = schema.name;
        this.fields = {};
        this.fieldNames = Object.keys(schema.fields);
    }

    parse() {
        let schema = this.schema,
            fields = {};

        this.fieldNames.forEach(field => {
            let config = schema.fields[field],
                definition = null;

            // Convert primitives to configuration objects
            if (typeof config === 'string') {
                if (isPrimitive(config)) {
                    config = { type: config };
                } else {
                    throw new TypeError(`Invalid primitive type "${config}".`);
                }
            }
            
            // Check if a type exists
            if (!config.type || !isSupported(config.type)) {
                throw new TypeError(`Type "${config.type || 'unknown'}" not supported.`);
            }

            // Instantiate definition classes for each type
            switch (config.type) {
                case 'array':
                    definition = new ArrayDef(config);
                    break;
                case 'boolean':
                    definition = new BoolDef(config);
                    break;
                case 'enum':
                    definition = new EnumDef(config);
                    break;
                case 'function':
                    definition = new FuncDef(config);
                    break;
                case 'instance':
                    definition = new InstanceDef(config);
                    break;
                case 'number':
                    definition = new NumberDef(config);
                    break;
                case 'object':
                    definition = new ObjectDef(config);
                    break;
                case 'shape':
                    definition = new ShapeDef(config);
                    break;
                case 'string':
                    definition = new StringDef(config);
                    break;
            }

            fields[field] = definition;
        });

        return this.fields = fields;
    }
}
