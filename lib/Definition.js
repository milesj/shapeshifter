'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

var Definition = function () {
  /**
   * Represents a type definition for an attribute.
   *
   * @param {Object} options
   * @param {String} attribute
   * @param {Object} config
   */
  function Definition(options, attribute) {
    var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, Definition);

    this.options = options;
    this.attribute = attribute;
    this.config = _extends({
      null: options.defaultNull,
      required: options.defaultRequired
    }, config);

    this.validateConfig();
  }

  /**
   * Returns true if the attribute allows nulls.
   *
   * @returns {Boolean}
   */


  _createClass(Definition, [{
    key: 'isNullable',
    value: function isNullable() {
      return this.config.null;
    }

    /**
     * Returns true if the attribute is required.
     *
     * @returns {Boolean}
     */

  }, {
    key: 'isRequired',
    value: function isRequired() {
      return this.config.required;
    }

    /**
     * Validate the definition configuration.
     */

  }, {
    key: 'validateConfig',
    value: function validateConfig() {
      var config = this.config;

      if (typeof config.null !== 'boolean') {
        throw new TypeError('Invalid type detected, "null" property must be a boolean.');
      }

      if (typeof config.required !== 'boolean') {
        throw new TypeError('Invalid type detected, "required" property must be a boolean.');
      }
    }
  }]);

  return Definition;
}();

exports.default = Definition;