'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.includes = includes;
exports.pick = pick;
exports.omit = omit;
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

var _formElementFromReact = require('./formElement/formElementFromReact');

var _formElementFromReact2 = _interopRequireDefault(_formElementFromReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function includes(array, val) {
  return array.indexOf(val) > -1;
}

function pick(obj, keys) {
  return Object.keys(obj).filter(function (key) {
    return includes(keys, key);
  }).map(function (key) {
    return _defineProperty({}, key, obj[key]);
  }).reduce(function (prev, curr) {
    return Object.assign(prev, curr);
  }, {});
}

function omit(obj, keys) {
  return Object.keys(obj).filter(function (key) {
    return !includes(keys, key);
  }).map(function (key) {
    return _defineProperty({}, key, obj[key]);
  }).reduce(function (prev, curr) {
    return Object.assign(prev, curr);
  }, {});
}

function isAReactEl() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return !!_react2.default.Children.toArray(el).filter(function (child) {
    return _react2.default.isValidElement(child);
  })[0];
}

function isAFormEl(_ref3) {
  var type = _ref3.type;

  return includes(['input', 'textarea', 'select'], type);
}

function isAFormGroup(_ref4) {
  var type = _ref4.type;

  if (typeof type === 'function' && type.name === 'Connect') {
    return type.WrappedComponent.displayName === 'FormGroup';
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

function pickValidation(_ref5, keys) {
  var rules = _ref5.rules,
      messages = _ref5.messages,
      helpers = _ref5.helpers;

  return {
    rules: pick(rules, keys),
    messages: pick(messages, keys),
    helpers: pick(helpers, keys)
  };
}

function omitValidation(_ref6, keys) {
  var rules = _ref6.rules,
      messages = _ref6.messages,
      helpers = _ref6.helpers;

  return {
    rules: omit(rules, keys),
    messages: omit(messages, keys),
    helpers: omit(helpers, keys)
  };
}

function filterValidation(_ref7) {
  var validation = _ref7.validation,
      children = _ref7.children;

  return pickValidation(validation, getFormElementNames(children));
}
//# sourceMappingURL=formUtils.js.map