import validate from 'validate.js';

validate.validators.pattern = (value, options, attribute, attributes) => (
  validate.validators.format(value, {
    pattern: options.pattern,
    message: options.message,
    flags: 'i'
  }, attribute, attributes)
);
