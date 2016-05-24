import Definition from '../Definition';

export const SUPPORTED_TYPES = ['number', 'string', 'function'];

export default class Enum extends Definition {
    validateConfig() {
        super.validateConfig();

        let config = this.config;

        if (!config.valueType || SUPPORTED_TYPES.indexOf(config.valueType) === -1) {
            throw new TypeError(`Enumerable value type "${config.valueType || 'unknown'}" not supported.`);
        }

        if (!Array.isArray(config.values)) {
            throw new TypeError('Enumerable values must be an array.');

        } else if (!config.values.every(value => this.validateValue(value))) {
            throw new TypeError('Enumerable values do not match the defined value type.');
        }
    }

    // TODO - support non-primitive values
    validateValue(value) {
        let valueType = this.config.valueType;

        // Function names are defined as string within the schema
        if (valueType === 'function') {
            valueType = 'string';
        }

        return (typeof value === valueType);
    }
}
