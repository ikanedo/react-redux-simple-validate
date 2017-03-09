'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = formElementFromEvt;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormElementFromEvt = exports.FormElementFromEvt = function () {
  function FormElementFromEvt(event) {
    _classCallCheck(this, FormElementFromEvt);

    this.element = event.target;
  }

  _createClass(FormElementFromEvt, [{
    key: 'getVal',
    value: function getVal() {
      switch (this.element.type) {
        case 'checkbox':
          return this.element.checked;
        default:
          return this.element.value || '';
      }
    }
  }]);

  return FormElementFromEvt;
}();

function formElementFromEvt() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(FormElementFromEvt, [null].concat(args)))();
}
//# sourceMappingURL=formElementFromEvt.js.map