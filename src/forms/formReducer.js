import * as CONST from './formConstants';

export default function forms(state = {}, action) {
  const form = state[action.formName] || {};
  const formValues = form.values || {};
  const formErrors = form.errors || {};

  switch (action.type) {
    case CONST.FORM_DATA_REPLACE:
    case CONST.FORM_INITIAL_DATA:
      return {
        ...state,
        [action.formName]: {
          errors: action.errors,
          values: action.values
        }
      };
    case CONST.FORM_DATA_MERGE:
      return {
        ...state,
        [action.formName]: {
          errors: action.errors,
          values: {
            ...formValues,
            ...action.values
          }
        }
      };
    case CONST.FORM_INPUT_CHANGE:
      return {
        ...state,
        [action.formName]: {
          errors: { ...formErrors },
          values: {
            ...formValues,
            ...action.formInput
          }
        }
      };
    case CONST.FORM_RESET:
      return {
        ...state,
        [action.formName]: {
          errors: {},
          values: {}
        }
      };
    case CONST.FORM_VALIDATE:
      return {
        ...state,
        [action.formName]: {
          values: { ...formValues },
          errors: { ...action.errors }
        }
      };
    case CONST.FORM_SINGLE_VALIDATE:
      return {
        ...state,
        [action.formName]: {
          values: { ...formValues },
          errors: {
            ...formErrors,
            ...action.errors
          }
        }
      };
    case CONST.FORM_TRIGGER_VALIDATION:
      return {
        ...state,
        [action.formName]: {
          values: { ...formValues },
          errors: { ...formErrors },
          isTriggerValidation: action.trigger
        }
      };
    default:
      return state;
  }
}
