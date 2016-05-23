'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Array = require('./definitions/Array');

var _Array2 = _interopRequireDefault(_Array);

var _Bool = require('./definitions/Bool');

var _Bool2 = _interopRequireDefault(_Bool);

var _Enum = require('./definitions/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _Func = require('./definitions/Func');

var _Func2 = _interopRequireDefault(_Func);

var _Instance = require('./definitions/Instance');

var _Instance2 = _interopRequireDefault(_Instance);

var _Number = require('./definitions/Number');

var _Number2 = _interopRequireDefault(_Number);

var _Object = require('./definitions/Object');

var _Object2 = _interopRequireDefault(_Object);

var _Shape = require('./definitions/Shape');

var _Shape2 = _interopRequireDefault(_Shape);

var _String = require('./definitions/String');

var _String2 = _interopRequireDefault(_String);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compiler = function () {
    function Compiler(schema) {
        _classCallCheck(this, Compiler);

        this.schema = schema;
    }

    _createClass(Compiler, [{
        key: 'compileFields',
        value: function compileFields() {
            var _this = this;

            var fields = [];

            this.schema.fieldNames.forEach(function (field) {
                var definition = _this.schema.fields[field];

                if (definition instanceof _Bool2.default) {
                    fields.push(_this.renderBool(field, definition));
                } else if (definition instanceof _Func2.default) {
                    fields.push(_this.renderFunc(field, definition));
                } else if (definition instanceof _Number2.default) {
                    fields.push(_this.renderNumber(field, definition));
                } else if (definition instanceof _String2.default) {
                    fields.push(_this.renderString(field, definition));
                }
            });

            return fields;
        }
    }]);

    return Compiler;
}();

exports.default = Compiler;