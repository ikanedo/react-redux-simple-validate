import * as CONST from './formConstants';

export function setInitialData(formName, values = {}, errors = {}) {
  return {
    type: CONST.FORM_INITIAL_DATA,
    formName,
    values,
    errors
  };
}

export function setDataReplace(formName, values = {}, errors = {}) {
  return {
    type: CONST.FORM_DATA_REPLACE,
    formName,
    values,
    errors
  };
}

export function setDataMerge(formName, values = {}, errors = {}) {
  return {
    type: CONST.FORM_DATA_MERGE,
    formName,
    values,
    errors
  };
}

export function setValidity(formName, errorsMsgs) {
  return {
    type: CONST.FORM_VALIDATE,
    errors: errorsMsgs,
    formName
  };
}

export function setSingleValidity(formName, errorsMsgs) {
  return {
    type: CONST.FORM_SINGLE_VALIDATE,
    errors: errorsMsgs,
    formName
  };
}

export function setInputValue(formName, inputKeyVal) {
  return {
    type: CONST.FORM_INPUT_CHANGE,
    formInput: inputKeyVal,
    formName
  };
}

export function reset(formName) {
  return {
    type: CONST.FORM_RESET,
    formName
  };
}

export function triggerValidate(formName, trigger = true) {
  return {
    type: CONST.FORM_TRIGGER_VALIDATION,
    formName,
    trigger
  };
}
