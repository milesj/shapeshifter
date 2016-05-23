export default class Definition {
    constructor(config) {
        this.config = {
            null: true,
            required: false,
            ...config
        };

        this.validateConfig();
    }

    isNullable() {
        return this.config.null || false;
    }

    isRequired() {
        return this.config.required || false;
    }

    validateConfig() {
        let config = this.config;

        if (typeof config.null !== 'boolean') {
            throw new TypeError('Invalid type detected, "null" property must be a boolean.');
        }

        if (typeof config.required !== 'boolean') {
            throw new TypeError('Invalid type detected, "required" property must be a boolean.');
        }
    }
}
