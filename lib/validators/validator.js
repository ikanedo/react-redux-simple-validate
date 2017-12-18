'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _validate3 = require('validate.js');

var _validate4 = _interopRequireDefault(_validate3);

require('./adapters/required');

require('./adapters/minlength');

require('./adapters/maxlength');

require('./adapters/pattern');

require('./adapters/equalTo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getMessage(msg) {
  if (typeof msg === 'function') {
    return msg;
  }

  if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
    return msg;
  }

  return '^' + msg;
}

function transformToObject(prev, current) {
  return Object.assign(prev, current);
}

function adaptRuleAndMsg(valRulesAndMsg, key) {
  var helpers = (valRulesAndMsg.helpers || {})[key] || {};
  return Object.keys(valRulesAndMsg.rules[key]).map(function (rule) {
    var _rule;

    return _defineProperty({}, rule, (_rule = {}, _defineProperty(_rule, rule, valRulesAndMsg.rules[key][rule]), _defineProperty(_rule, 'message', getMessage(valRulesAndMsg.messages[key][rule])), _defineProperty(_rule, 'helpers', helpers[rule] || null), _rule));
  }).reduce(transformToObject, {});
}

function adaptConstraints(valRulesAndMsg) {
  return Object.keys(valRulesAndMsg.rules).map(function (key) {
    return _defineProperty({}, key, adaptRuleAndMsg(valRulesAndMsg, key));
  }).reduce(transformToObject, {});
}

var Validate = function () {
  function Validate(valRulesAndMsg) {
    _classCallCheck(this, Validate);

    this.setConstraints(valRulesAndMsg);
  }

  _createClass(Validate, [{
    key: 'setConstraints',
    value: function setConstraints(valRulesAndMsg) {
      this.constraints = adaptConstraints(valRulesAndMsg);
    }
  }, {
    key: 'validate',
    value: function validate(formData) {
      var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constraints;

      return (0, _validate4.default)(formData, constraints) || '';
    }
  }, {
    key: 'single',
    value: function single(key, formData) {
      var constraints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.constraints;

      var errorMsgs = (0, _validate4.default)(formData, _defineProperty({}, key, constraints[key])) || {};
      return errorMsgs[key] || '';
    }
  }]);

  return Validate;
}();

exports.default = Validate;
//# sourceMappingURL=validator.js.map