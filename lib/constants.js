'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

var PRIMITIVE_TYPES = exports.PRIMITIVE_TYPES = ['boolean', 'number', 'string'];
var COMPOUND_TYPES = exports.COMPOUND_TYPES = ['array', 'enum', 'instance', 'object', 'shape', 'union', 'function'];
var TYPES = exports.TYPES = PRIMITIVE_TYPES.concat(COMPOUND_TYPES);