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

    static definition(attribute, config) {
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
                return new ArrayDefinition(attribute, config);
            case 'boolean':
                return new BoolDefinition(attribute, config);
            case 'enum':
                return new EnumDefinition(attribute, config);
            case 'function':
                return new FuncDefinition(attribute, config);
            case 'instance':
                return new InstanceDefinition(attribute, config);
            case 'number':
                return new NumberDefinition(attribute, config);
            case 'object':
                return new ObjectDefinition(attribute, config);
            case 'shape':
                return new ShapeDefinition(attribute, config);
            case 'string':
                return new StringDefinition(attribute, config);
        }
    };
}
