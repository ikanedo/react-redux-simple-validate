'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAReactEl = isAReactEl;
exports.isAFormEl = isAFormEl;
exports.isAFormGroup = isAFormGroup;
exports.getFormElementNames = getFormElementNames;
exports.getFormData = getFormData;
exports.pickValidation = pickValidation;
exports.omitValidation = omitValidation;
exports.filterValidation = filterValidation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _formElementFromReact = require('./formElement/formElementFromReact');

var _formElementFromReact2 = _interopRequireDefault(_formElementFromReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAReactEl() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return !!(0, _find2.default)(_react2.default.Children.toArray(el), function (child) {
    return _react2.default.isValidElement(child);
  });
}

function isAFormEl(_ref) {
  var type = _ref.type;

  return (0, _includes2.default)(['input', 'textarea', 'select'], type);
}

function isAFormGroup(_ref2) {
  var type = _ref2.type;

  if (typeof type === 'function' && type.name === 'Connect') {
    return type.WrappedComponent.name === 'FormGroup';
  }

  return false;
}

function getFormElementNames(children) {
  return _react2.default.Children.map(children, function (element) {
    if (!isAReactEl(element)) {
      return null;
    }

    if (isAFormEl(element)) {
      return element.props.name;
    }

    if (isAReactEl(element.props.children)) {
      return getFormElementNames(element.props.children);
    }

    return null;
  });
}

function getFormData(children, refs) {
  return _react2.default.Children.map(children, function (element) {
    if (!isAReactEl(element)) {
      return null;
    }

    if (isAFormEl(element)) {
      return (0, _formElementFromReact2.default)(element, refs).getKeyVal();
    }

    if (isAReactEl(element.props.children)) {
      return getFormData(element.props.children, refs);
    }

    return null;
  }).reduce(function (prev, current) {
    return Object.assign({}, prev, current);
  }, {});
}

function pickValidation(_ref3, keys) {
  var rules = _ref3.rules,
      messages = _ref3.messages;

  return {
    rules: (0, _pick2.default)(rules, keys),
    messages: (0, _pick2.default)(messages, keys)
  };
}

function omitValidation(_ref4, keys) {
  var rules = _ref4.rules,
      messages = _ref4.messages;

  return {
    rules: (0, _omit2.default)(rules, keys),
    messages: (0, _omit2.default)(messages, keys)
  };
}

function filterValidation(_ref5) {
  var validation = _ref5.validation,
      children = _ref5.children;

  return pickValidation(validation, getFormElementNames(children));
}
//# sourceMappingURL=formUtils.js.map