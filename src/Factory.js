import ArrayDefinition from '../lib/definitions/Array';
import BoolDefinition from '../lib/definitions/Bool';
import EnumDefinition from '../lib/definitions/Enum';
import FuncDefinition from '../lib/definitions/Func';
import InstanceDefinition from '../lib/definitions/Instance';
import NumberDefinition from '../lib/definitions/Number';
import ObjectDefinition from '../lib/definitions/Object';
import ShapeDefinition from '../lib/definitions/Shape';
import StringDefinition from '../lib/definitions/String';
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
                return new ArrayDefinition(field, config);
            case 'boolean':
                return new BoolDefinition(field, config);
            case 'enum':
                return new EnumDefinition(field, config);
            case 'function':
                return new FuncDefinition(field, config);
            case 'instance':
                return new InstanceDefinition(field, config);
            case 'number':
                return new NumberDefinition(field, config);
            case 'object':
                return new ObjectDefinition(field, config);
            case 'shape':
                return new ShapeDefinition(field, config);
            case 'string':
                return new StringDefinition(field, config);
        }
    };
}
