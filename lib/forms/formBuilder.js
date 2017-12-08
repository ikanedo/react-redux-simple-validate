'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = formBuilder;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

var _formUtils = require('./formUtils');

var _formConstants = require('./formConstants');

var _formElementUtils = require('./formElement/formElementUtils');

var _formElementFromState = require('./formElement/formElementFromState');

var _formElementFromState2 = _interopRequireDefault(_formElementFromState);

var _formElementFromEvt = require('./formElement/formElementFromEvt');

var _formElementFromEvt2 = _interopRequireDefault(_formElementFromEvt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLikeStringOrNum(element) {
  return !(0, _formUtils.isAReactEl)(element);
}

function isAnErrorEl(_ref) {
  var type = _ref.type;

  return type.displayName === 'FormError';
}

function isAFormErrorElClass(_ref2) {
  var props = _ref2.props;

  return !!props['data-form-error'] || !!props.htmlFor;
}

function getErrorMsg(name, errors) {
  return (errors[name] || [])[0];
}

function getErrorElProps(element, _ref3) {
  var errors = _ref3.errors;
  var forInput = element.props.forInput;

  return _extends({}, element.props, {
    msg: getErrorMsg(forInput, errors)
  });
}

function getErrorClassElProps(element, _ref4) {
  var errors = _ref4.errors;

  var inputName = element.props['data-form-error'] || element.props.htmlFor;
  var errorClassName = getErrorMsg(inputName, errors) ? _formConstants.ERROR_INPUT_CLASS_NAME : '';

  return _extends({}, element.props, {
    className: element.props.className + ' ' + errorClassName
  });
}

function mergeCallbacks() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (e) {
    args.filter(function (arg) {
      return _validate2.default.isFunction(arg);
    }).forEach(function (cb) {
      return cb(e);
    });
  };
}

function getHasValueClassName(formElementValue) {
  var element = formElementValue || {};
  return _validate2.default.isEmpty(element.value) ? '' : _formConstants.HAS_VALUE_CLASS_NAME;
}

function getErrorInputClassName(name, errors) {
  var hasErrors = !!getErrorMsg(name, errors);
  return hasErrors ? _formConstants.ERROR_INPUT_CLASS_NAME : '';
}

function getValidateEvents(eventType, formGroupProps) {
  var onValidate = formGroupProps.onValidate,
      onInvalidate = formGroupProps.onInvalidate,
      invalidateEvent = formGroupProps.invalidateEvent,
      validateEvent = formGroupProps.validateEvent;


  if (invalidateEvent === eventType && validateEvent === eventType) {
    return function () {
      onInvalidate.apply(undefined, arguments);
      onValidate.apply(undefined, arguments);
    };
  }

  if (invalidateEvent === eventType) {
    return onInvalidate;
  }

  if (validateEvent === eventType) {
    return onValidate;
  }

  return null;
}

var lastFocusValue = null;
function getLastFocusValue(e) {
  lastFocusValue = (0, _formElementFromEvt2.default)(e).getVal();
}

function getFormElProps(element, formGroupProps) {
  var _element$props = element.props,
      name = _element$props.name,
      onChange = _element$props.onChange,
      onBlur = _element$props.onBlur,
      onFocus = _element$props.onFocus,
      className = _element$props.className;
  var errors = formGroupProps.errors,
      values = formGroupProps.values,
      onValueChange = formGroupProps.onValueChange,
      stringRefs = formGroupProps.stringRefs;


  var formElementValue = (0, _formElementFromState2.default)(element, values).getKeyVal();

  if (_validate2.default.isEmpty(name)) {
    throw new Error(element.type + ' element is missing a name attribute!', element);
  }

  var onChangeEvents = mergeCallbacks(onValueChange, onChange, getValidateEvents('onChange', formGroupProps));
  var onFocusEvents = mergeCallbacks(onFocus, getLastFocusValue, getValidateEvents('onFocus', formGroupProps));
  var onBlurEvents = mergeCallbacks(onBlur, getValidateEvents('onBlur', formGroupProps));

  return _extends({}, element.props, {
    key: name,
    ref: function ref(node) {
      stringRefs[(0, _formElementUtils.getFormElementRefName)(element)] = node;
    },

    onChange: onChangeEvents,
    onFocus: onFocusEvents,
    onBlur: function onBlur(e) {
      var hasTheValueChanged = (0, _formElementFromEvt2.default)(e).getVal() !== lastFocusValue;
      if (hasTheValueChanged) {
        onBlurEvents(e);
      }
    },
    className: [className, getErrorInputClassName(name, errors), getHasValueClassName(formElementValue)].join(' ')
  }, formElementValue);
}

function getElProps(element, args) {
  if ((0, _formUtils.isAFormEl)(element)) {
    return getFormElProps(element, args);
  }

  if (isAFormErrorElClass(element)) {
    return getErrorClassElProps(element, args);
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