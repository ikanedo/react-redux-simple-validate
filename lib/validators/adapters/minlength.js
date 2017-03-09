'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_validate2.default.validators.minlength = function (value, options) {
  return _validate2.default.validators.length(value, {
    minimum: options.minlength,
    message: options.message
  });
};
//# sourceMappingURL=minlength.js.map