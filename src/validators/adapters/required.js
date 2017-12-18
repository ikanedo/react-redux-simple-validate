import validate from 'validate.js';

validate.validators.required = (value, options) => {
  if (options.required && validate.isEmpty(value)) {
    return options.message;
  }

  return undefined;
};
