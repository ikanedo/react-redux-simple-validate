'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormElementFromReact = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = formElementFromReact;

var _formElementUtils = require('./formElementUtils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormElementFromReact = exports.FormElementFromReact = function () {
  function FormElementFromReact(element, refs) {
    _classCallCheck(this, FormElementFromReact);

    this.element = element;
    this.refs = refs;
    this.type = (0, _formElementUtils.getFormElementType)(element);
  }

  _createClass(FormElementFromReact, [{
    key: 'ref',
    value: function ref() {
      return this.refs[(0, _formElementUtils.getFormElementRefName)(this.element)] || {};
    }
  }, {
    key: 'getKeyVal',
    value: function getKeyVal() {
      return this[this.type]();
    }
  }, {
    key: 'notype',
    value: function notype() {
      // eslint-disable-line
      return null;
    }
  }, {
    key: 'radio',
    value: function radio() {
      if (this.ref().checked) {
        return _defineProperty({}, this.element.props.name, this.ref().value);
      }

      return null;
    }
  }, {
    key: 'checkbox',
    value: function checkbox() {
      return _defineProperty({}, this.element.props.name, this.ref().checked);
    }
  }, {
    key: 'select',
    value: function select() {
      return _defineProperty({}, this.element.props.name, this.ref().value);
    }
  }, {
    key: 'default',
    value: function _default() {
      return _defineProperty({}, this.element.props.name, this.ref().value);
    }
  }]);

  return FormElementFromReact;
}();

function formElementFromReact() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(FormElementFromReact, [null].concat(args)))();
}
//# sourceMappingURL=formElementFromReact.js.map