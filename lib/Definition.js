'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Definition = function () {
    function Definition(config) {
        _classCallCheck(this, Definition);

        this.config = _extends({
            null: true,
            required: false
        }, config);

        this.validateConfig();
    }

    _createClass(Definition, [{
        key: 'isNullable',
        value: function isNullable() {
            return this.config.null || false;
        }
    }, {
        key: 'isRequired',
        value: function isRequired() {
            return this.config.required || false;
        }
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