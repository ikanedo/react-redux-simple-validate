import validate from 'validate.js';

validate.validators.minlength = (value, options) => (
  validate.validators.length(value, {
    minimum: options.minlength,
    message: options.message
  })
);
