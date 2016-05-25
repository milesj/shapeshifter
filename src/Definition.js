import cfg from './config';

export default class Definition {
  constructor(attribute, config) {
    this.attribute = attribute;
    this.config = {
      null: cfg.defaultNull,
      required: cfg.defaultRequired,
      ...config,
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
    const config = this.config;

    if (typeof config.null !== 'boolean') {
      throw new TypeError('Invalid type detected, "null" property must be a boolean.');
    }

    if (typeof config.required !== 'boolean') {
      throw new TypeError('Invalid type detected, "required" property must be a boolean.');
    }
  }
}
