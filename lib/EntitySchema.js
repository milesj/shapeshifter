'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

var EntitySchema = function () {
  /**
   * Represents a schema for an entity.
   */
  function EntitySchema() {
    _classCallCheck(this, EntitySchema);

    this.primaryKey = 'id';
    this.attributes = [];
    this.relations = {};
  }

  /**
   * Map a list of attribute names.
   *
   * @param {String[]} attributes
   */


  _createClass(EntitySchema, [{
    key: 'addAttributes',
    value: function addAttributes(attributes) {
      this.attributes = this.attributes.concat(attributes);
    }

    /**
     * Map nested entities by attribute name.
     *
     * @param {Object} relations
     */

  }, {
    key: 'addRelations',
    value: function addRelations(relations) {
      var _this = this;

      Object.keys(relations).forEach(function (attribute) {
        var schema = relations[attribute];

        if (schema instanceof EntitySchema) {
          _this.relations[attribute] = schema;
          _this.attributes.push(attribute);
        } else {
          throw new Error('Relation "' + attribute + '" is not an entity schema.');
        }
      });
    }
  }]);

  return EntitySchema;
}();

exports.default = EntitySchema;