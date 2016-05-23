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

export default class Parser {
    constructor(json) {
        let schema = {};

        if (typeof json === 'string') {
            schema = JSON.parse(json);
        } else if (isObject(json)) {
            schema = json;
        } else {
            throw new Error('Parse requires a valid JSON structure.');
        }

        this.schema = schema;
        this.fields = {};
    }

    parse() {
        let schema = this.schema,
            fields = {};

        Object.keys(schema).forEach(field => {
            let config = schema[field],
                definition = null;

            // Convert primitives to configuration objects
            if (typeof config === 'string') {
                if (isPrimitive(config)) {
                    config = { type: config };
                } else {
                    throw new Error(`Invalid primitive type "${config}".`);
                }
            }
            
            // Check if a type exists
            if (!config.type || !isSupported(config.type)) {
                throw new Error(`Type "${config.type || 'unknown'}" not supported.`);
            }

            // Instantiate definition classes for each type
            switch (config.type) {
                case 'array':
                    definition = new ArrayDef(config);
                    break;
                case 'bool':
                    definition = new BoolDef(config);
                    break;
                case 'enum':
                    definition = new EnumDef(config);
                    break;
                case 'func':
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
