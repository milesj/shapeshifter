'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Flow = require('./renderers/Flow');

var _Flow2 = _interopRequireDefault(_Flow);

var _React = require('./renderers/React');

var _React2 = _interopRequireDefault(_React);

var _TypeScript = require('./renderers/TypeScript');

var _TypeScript2 = _interopRequireDefault(_TypeScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compiler = function () {
  function Compiler(options) {
    _classCallCheck(this, Compiler);

    _config2.default.defaultNull = options.null;
    _config2.default.defaultRequired = options.required;
    _config2.default.indentCharacter = options.indent;
    _config2.default.renderer = options.renderer;
    _config2.default.schemaSuffix = options.suffix;
  }

  _createClass(Compiler, [{
    key: 'compile',
    value: function compile(path) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _fs2.default.stats(path, function (error, stats) {
          if (error) {
            reject(error);
          }

          console.log(stats);

          if (stats.isDirectory()) {
            resolve(_this.compileFolder(path));
          } else if (stats.isFile()) {
            resolve(_this.compileFile(path));
          } else {
            reject('Unsupported file type.');
          }
        });
      });
    }
  }, {
    key: 'compileFolder',
    value: function compileFolder(path) {
      console.log(path);
    }
  }, {
    key: 'compileFile',
    value: function compileFile(path) {
      console.log(path);
    }
  }, {
    key: 'createRenderer',
    value: function createRenderer(schema) {
      switch (_config2.default.renderer) {
        case 'react':
          return new _React2.default(schema);
        case 'flow':
          return new _Flow2.default(schema);
        case 'ts':
        case 'typescript':
          return new _TypeScript2.default(schema);
      }
    }
  }]);

  return Compiler;
}();

exports.default = Compiler;