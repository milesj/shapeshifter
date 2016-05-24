import config from './config';

export default class Definition {
    constructor(cfg) {
        this.config = {
            null: config.defaultNull,
            required: config.defaultRequired,
            ...cfg
        };

        this.validateConfig();
    }

    isNullable() {
        return this.config.null;
    }

    isRequired() {
        return this.config.required;
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
