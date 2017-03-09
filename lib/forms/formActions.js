'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInitialData = setInitialData;
exports.setDataReplace = setDataReplace;
exports.setDataMerge = setDataMerge;
exports.setValidity = setValidity;
exports.setSingleValidity = setSingleValidity;
exports.setInputValue = setInputValue;
exports.reset = reset;
exports.triggerValidate = triggerValidate;

var _formConstants = require('./formConstants');

var CONST = _interopRequireWildcard(_formConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setInitialData(formName) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var errors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return {
    type: CONST.FORM_INITIAL_DATA,
    formName: formName,
    values: values,
    errors: errors
  };
}

function setDataReplace(formName) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var errors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return {
    type: CONST.FORM_DATA_REPLACE,
    formName: formName,
    values: values,
    errors: errors
  };
}

function setDataMerge(formName) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var errors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return {
    type: CONST.FORM_DATA_MERGE,
    formName: formName,
    values: values,
    errors: errors
  };
}

function setValidity(formName, errorsMsgs) {
  return {
    type: CONST.FORM_VALIDATE,
    errors: errorsMsgs,
    formName: formName
  };
}

function setSingleValidity(formName, errorsMsgs) {
  return {
    type: CONST.FORM_SINGLE_VALIDATE,
    errors: errorsMsgs,
    formName: formName
  };
}

function setInputValue(formName, inputKeyVal) {
  return {
    type: CONST.FORM_INPUT_CHANGE,
    formInput: inputKeyVal,
    formName: formName
  };
}

function reset(formName) {
  return {
    type: CONST.FORM_RESET,
    formName: formName
  };
}

function triggerValidate(formName) {
  var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return {
    type: CONST.FORM_TRIGGER_VALIDATION,
    formName: formName,
    trigger: trigger
  };
}
//# sourceMappingURL=formActions.js.map