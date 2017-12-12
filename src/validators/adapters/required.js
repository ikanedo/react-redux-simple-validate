import validate from 'validate.js';

validate.validators.required = (value, options) => {
  if (validate.isEmpty(value)) {
    return options.message;
  }

  return undefined;
};
