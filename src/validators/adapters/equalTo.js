import validate from 'validate.js';

validate.validators.equalTo = (value, options, attribute, attributes) => (
  validate.validators.equality(value, {
    attribute: options.equalTo.replace(/\[name=|\]|"|'/g, ''),
    message: options.message
  }, attribute, attributes)
);
