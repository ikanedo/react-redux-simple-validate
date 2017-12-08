import validate from 'validate.js';

validate.validators.required = (value, options) => {
  if (validate.isEmpty(value)) {
    return options.message || "can't be blank";
  }

  return undefined;
};
