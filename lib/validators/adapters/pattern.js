'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_validate2.default.validators.pattern = function (value, options, attribute, attributes) {
  return _validate2.default.validators.format(value, {
    pattern: options.pattern,
    message: options.message,
    flags: 'i'
  }, attribute, attributes);
};
//# sourceMappingURL=pattern.js.map