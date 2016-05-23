'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isSupported;

var _constants = require('../constants');

function isSupported(type) {
    return _constants.TYPES.indexOf(type) >= 0;
}