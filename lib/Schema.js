'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _OneRelation = require('./schemas/OneRelation');

var _OneRelation2 = _interopRequireDefault(_OneRelation);

var _ManyRelation = require('./schemas/ManyRelation');

var _ManyRelation2 = _interopRequireDefault(_ManyRelation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
  /**
   * Represents a basic relational schema for an entity.
   *
   * @param {String} resourceName
   * @param {String} [primaryKey]
   */
  function Schema(resourceName) {
    var primaryKey = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    _classCallCheck(this, Schema);

    this.resourceName = resourceName;
    this.primaryKey = primaryKey;
    this.attributes = [];
    this.relations = {};
  }

  /**
   * Map a list of attribute names.
   *
   * @param {String[]} attributes
   */


  _createClass(Schema, [{
    key: 'addAttributes',
    value: function addAttributes(attributes) {
      this.attributes = this.attributes.concat(attributes);
    }

    /**
     * Map a one/many relational schema to the current schema.
     *
     * @param {String} attribute
     * @param {Relation} relation
     */

  }, {
    key: 'addRelation',
    value: function addRelation(attribute, relation) {
      this.relations[attribute] = relation;
      this.attributes.push(attribute);
    }

    /**
     * @see hasOne
     */

  }, {
    key: 'belongsTo',
    value: function belongsTo(relations) {
      return this.hasOne(relations);
    }

    /**
     * @see hasMany
     */

  }, {
    key: 'belongsToMany',
    value: function belongsToMany(relations) {
      return this.hasMany(relations);
    }

    /**
     * Map has-one nested entities by attribute name.
     *
     * @param {Object} relations
     */

  }, {
    key: 'hasOne',
    value: function hasOne(relations) {
      var _this = this;

      Object.keys(relations).forEach(function (attribute) {
        var schema = relations[attribute];

        if (schema instanceof Schema) {
          _this.addRelation(attribute, new _OneRelation2.default(schema));
        } else {
          throw new Error('Relation "' + attribute + '" is not a valid schema.');
        }
      });

      return this;
    }

    /**
     * Map has-many nested entities by attribute name.
     *
     * @param {Object} relations
     */

  }, {
    key: 'hasMany',
    value: function hasMany(relations) {
      var _this2 = this;

      Object.keys(relations).forEach(function (attribute) {
        var schema = relations[attribute];

        if (schema instanceof Schema) {
          _this2.addRelation(attribute, new _ManyRelation2.default(schema));
        } else {
          throw new Error('Relation "' + attribute + '" is not a valid schema.');
        }
      });

      return this;
    }
  }]);

  return Schema;
}();

exports.default = Schema;