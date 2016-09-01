'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Definition2 = require('../Definition');

var _Definition3 = _interopRequireDefault(_Definition2);

var _Factory = require('../Factory');

var _Factory2 = _interopRequireDefault(_Factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FuncDefinition = function (_Definition) {
  _inherits(FuncDefinition, _Definition);

  function FuncDefinition() {
    _classCallCheck(this, FuncDefinition);

    return _possibleConstructorReturn(this, (FuncDefinition.__proto__ || Object.getPrototypeOf(FuncDefinition)).apply(this, arguments));
  }

  _createClass(FuncDefinition, [{
    key: 'validateConfig',

    /**
     * {@inheritDoc}
     */
    value: function validateConfig() {
      _get(FuncDefinition.prototype.__proto__ || Object.getPrototypeOf(FuncDefinition.prototype), 'validateConfig', this).call(this);

      var _config = this.config;
      var argTypes = _config.argTypes;
      var returnType = _config.returnType;

      // TODO test

      if (typeof returnType !== 'undefined') {
        this.returnType = _Factory2.default.definition('returnType', returnType);
      }

      if (typeof argTypes !== 'undefined') {
        if (!Array.isArray(argTypes)) {
          throw new SyntaxError('Function argument types must be an array of type definitions.');
        } else {
          this.argTypes = argTypes.map(function (type, i) {
            return _Factory2.default.definition('arg' + i, type);
          });
        }
      }
    }
  }]);

  return FuncDefinition;
}(_Definition3.default);

exports.default = FuncDefinition;