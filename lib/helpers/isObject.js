'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = isObject;
/**
 * Return true if the value is a literal object.
 *
 * @param {*} value
 * @returns {Boolean}
 */
function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && !Array.isArray(value);
}