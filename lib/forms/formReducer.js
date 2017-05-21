'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = forms;

var _formConstants = require('./formConstants');

var CONST = _interopRequireWildcard(_formConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function forms() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var form = state[action.formName] || {};
  var formValues = form.values || {};
  var formErrors = form.errors || {};

  switch (action.type) {
    case CONST.FORM_DATA_REPLACE:
    case CONST.FORM_INITIAL_DATA:
      return _extends({}, state, _defineProperty({}, action.formName, {
        errors: action.errors,
        values: action.values
      }));
    case CONST.FORM_DATA_MERGE:
      return _extends({}, state, _defineProperty({}, action.formName, {
        errors: _extends({}, formErrors, action.errors),
        values: _extends({}, formValues, action.values)
      }));
    case CONST.FORM_INPUT_CHANGE:
      return _extends({}, state, _defineProperty({}, action.formName, {
        errors: _extends({}, formErrors),
        values: _extends({}, formValues, action.formInput)
      }));
    case CONST.FORM_RESET:
      return _extends({}, state, _defineProperty({}, action.formName, {
        errors: {},
        values: {}
      }));
    case CONST.FORM_VALIDATE:
      return _extends({}, state, _defineProperty({}, action.formName, {
        values: _extends({}, formValues),
        errors: _extends({}, action.errors)
      }));
    case CONST.FORM_SINGLE_VALIDATE:
      return _extends({}, state, _defineProperty({}, action.formName, {
        values: _extends({}, formValues),
        errors: _extends({}, formErrors, action.errors)
      }));
    case CONST.FORM_TRIGGER_VALIDATION:
      return _extends({}, state, _defineProperty({}, action.formName, {
        values: _extends({}, formValues),
        errors: _extends({}, formErrors),
        isTriggerValidation: action.trigger
      }));
    default:
      return state;
  }
}
//# sourceMappingURL=formReducer.js.map