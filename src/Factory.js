import ArrayDef from '../lib/definitions/Array';
import BoolDef from '../lib/definitions/Bool';
import EnumDef from '../lib/definitions/Enum';
import FuncDef from '../lib/definitions/Func';
import InstanceDef from '../lib/definitions/Instance';
import NumberDef from '../lib/definitions/Number';
import ObjectDef from '../lib/definitions/Object';
import ShapeDef from '../lib/definitions/Shape';
import StringDef from '../lib/definitions/String';
import isPrimitive from '../lib/helpers/isPrimitive';
import isSupported from '../lib/helpers/isSupported';

export default class Factory {

    static definition(field, config) {
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

        // Instantiate definition classes
        switch (config.type) {
            case 'array':
                return new ArrayDef(field, config);
            case 'boolean':
                return new BoolDef(field, config);
            case 'enum':
                return new EnumDef(field, config);
            case 'function':
                return new FuncDef(field, config);
            case 'instance':
                return new InstanceDef(field, config);
            case 'number':
                return new NumberDef(field, config);
            case 'object':
                return new ObjectDef(field, config);
            case 'shape':
                return new ShapeDef(field, config);
            case 'string':
                return new StringDef(field, config);
        }
    };
}
