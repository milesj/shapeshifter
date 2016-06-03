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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnionDefinition = function (_Definition) {
  _inherits(UnionDefinition, _Definition);

  function UnionDefinition() {
    _classCallCheck(this, UnionDefinition);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnionDefinition).apply(this, arguments));
  }

  _createClass(UnionDefinition, [{
    key: 'validateConfig',

    /**
     * {@inheritDoc}
     */
    value: function validateConfig() {
      _get(Object.getPrototypeOf(UnionDefinition.prototype), 'validateConfig', this).call(this);

      var valueTypes = this.config.valueTypes;


      if (!Array.isArray(valueTypes) || !valueTypes.length) {
        throw new SyntaxError('Union definitions require a "valueTypes" property, ' + 'which is a list of type definitions');
      }

      this.valueTypes = valueTypes.map(function (type, i) {
        return _Factory2.default.definition('union' + i, type);
      });
    }
  }]);

  return UnionDefinition;
}(_Definition3.default);

exports.default = UnionDefinition;