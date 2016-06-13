'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PRIMITIVE_TYPES = exports.PRIMITIVE_TYPES = ['boolean', 'number', 'string'];
var COMPOUND_TYPES = exports.COMPOUND_TYPES = ['array', 'enum', 'instance', 'object', 'shape', 'union', 'function'];
var TYPES = exports.TYPES = PRIMITIVE_TYPES.concat(COMPOUND_TYPES);