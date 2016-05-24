import Definition from '../Definition';
import isPrimitive from '../helpers/isPrimitive';

export default class Enum extends Definition {
    validateConfig() {
        super.validateConfig();

        let { values, valueType } = this.config;

        if (!valueType || !isPrimitive(valueType)) {
            throw new TypeError(`Enumerable value type "${valueType || 'unknown'}" not supported.`);

        } else if (!Array.isArray(values)) {
            throw new TypeError('Enumerable values must be an array.');

        } else if (!values.every(value => this.validateValue(value))) {
            throw new TypeError('Enumerable values do not match the defined value type.');
        }
    }

    validateValue(value) {
        let { valueType } = this.config;

        // Function names are defined as strings within the schema
        if (valueType === 'function') {
            valueType = 'string';
        }

        return (typeof value === valueType);
    }
}
