'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = formBuilder;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _formUtils = require('./formUtils');

var _formConstants = require('./formConstants');

var _formElementUtils = require('./formElement/formElementUtils');

var _formElementFromState = require('./formElement/formElementFromState');

var _formElementFromState2 = _interopRequireDefault(_formElementFromState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLikeStringOrNum(element) {
  return !(0, _formUtils.isAReactEl)(element);
}

function isAnErrorEl(_ref) {
  var type = _ref.type;

  return type.displayName === 'FormError';
}

function getErrorMsg(name, errors) {
  return (errors[name] || [])[0];
}

function getErrorElProps(element, _ref2) {
  var errors = _ref2.errors;
  var forInput = element.props.forInput;

  return _extends({}, element.props, {
    msg: getErrorMsg(forInput, errors)
  });
}

function mergeCallbacks() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (e) {
    args.filter(function (arg) {
      return (0, _isFunction2.default)(arg);
    }).forEach(function (cb) {
      return cb(e);
    });
  };
}

function getHasValueClassName(formElementValue) {
  var element = formElementValue || {};
  return (0, _isEmpty2.default)(element.value) ? '' : _formConstants.HAS_VALUE_CLASS_NAME;
}

function getErrorInputClassName(name, errors) {
  var hasErrors = !!getErrorMsg(name, errors);
  return hasErrors ? _formConstants.ERROR_INPUT_CLASS_NAME : '';
}

function getFormElProps(element, _ref3) {
  var errors = _ref3.errors,
      values = _ref3.values,
      onValidate = _ref3.onValidate,
      onValueChange = _ref3.onValueChange;
  var _element$props = element.props,
      name = _element$props.name,
      onChange = _element$props.onChange,
      onBlur = _element$props.onBlur,
      className = _element$props.className;

  var formElementValue = (0, _formElementFromState2.default)(element, values).getKeyVal();

  if ((0, _isEmpty2.default)(name)) {
    throw new Error(element.type + ' element is missing a name attribute!', element);
  }

  return _extends({}, element.props, {
    key: name,
    ref: (0, _formElementUtils.getFormElementRefName)(element),
    onChange: mergeCallbacks(onValueChange, onChange),
    onBlur: mergeCallbacks(onValidate, onBlur),
    className: [className, getErrorInputClassName(name, errors), getHasValueClassName(formElementValue)].join(' ')
  }, formElementValue);
}

function getElProps(element, args) {
  if ((0, _formUtils.isAFormEl)(element)) {
    return getFormElProps(element, args);
  }

  if (isAnErrorEl(element)) {
    return getErrorElProps(element, args);
  }

  return element.props;
}

function getChildren(childrenProp, recurFormBuilder) {
  if ((0, _formUtils.isAReactEl)(childrenProp)) {
    return recurFormBuilder();
  }

  return childrenProp;
}

function formBuilder(args) {
  return _react2.default.Children.map(args.children, function (element) {
    if (isLikeStringOrNum(element) || (0, _formUtils.isAFormGroup)(element)) {
      return element;
    }

    var children = element.props.children;

    var elementProps = getElProps(element, args);
    var elementChildren = getChildren(children, formBuilder.bind(null, _extends({}, args, { children: children })));

    return [_react2.default.cloneElement(element, elementProps, elementChildren)];
  });
}
//# sourceMappingURL=formBuilder.js.map