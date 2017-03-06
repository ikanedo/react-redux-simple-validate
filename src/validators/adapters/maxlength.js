import validate from 'validate.js';

validate.validators.maxlength = (value, options) => (
  validate.validators.length(value, {
    maximum: options.maxlength,
    message: options.message
  })
);
