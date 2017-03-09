'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormElementFromState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = formElementFromState;

var _formElementUtils = require('./formElementUtils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormElementFromState = exports.FormElementFromState = function () {
  function FormElementFromState(element) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FormElementFromState);

    var _element$props = element.props,
        name = _element$props.name,
        value = _element$props.value,
        type = _element$props.type;


    this.name = name;
    this.value = value;
    this.stateValues = values;
    this.type = (0, _formElementUtils.getFormInputType)(type);
  }

  _createClass(FormElementFromState, [{
    key: 'getKeyVal',
    value: function getKeyVal() {
      if (this.stateValues.hasOwnProperty(this.name)) {
        return this[this.type]();
      }

      return null;
    }
  }, {
    key: 'checkbox',
    value: function checkbox() {
      return { checked: this.stateValues[this.name] };
    }
  }, {
    key: 'radio',
    value: function radio() {
      return { checked: this.stateValues[this.name] === this.value };
    }
  }, {
    key: 'default',
    value: function _default() {
      return { value: this.stateValues[this.name] };
    }
  }]);

  return FormElementFromState;
}();

function formElementFromState() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(FormElementFromState, [null].concat(args)))();
}
//# sourceMappingURL=formElementFromState.js.map