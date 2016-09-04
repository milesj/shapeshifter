/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

export default class Definition {
  /**
   * Represents a type definition for an attribute.
   *
   * @param {Object} options
   * @param {String} attribute
   * @param {Object} config
   */
  constructor(options, attribute, config = {}) {
    this.options = options;
    this.attribute = attribute;
    this.config = {
      null: options.defaultNull,
      required: options.defaultRequired,
      ...config,
    };

    this.validateConfig();
  }

  /**
   * Returns true if the attribute allows nulls.
   *
   * @returns {Boolean}
   */
  isNullable() {
    return this.config.null;
  }

  /**
   * Returns true if the attribute is required.
   *
   * @returns {Boolean}
   */
  isRequired() {
    return this.config.required;
  }

  /**
   * Validate the definition configuration.
   */
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
