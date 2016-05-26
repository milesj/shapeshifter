'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = isPrimitive;

var _constants = require('../constants');

/**
 * Verify that a value is a primitive type.
 *
 * @param {*} value
 * @returns {Boolean}
 */
function isPrimitive(value) {
  return _constants.PRIMITIVE_TYPES.indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) >= 0;
}