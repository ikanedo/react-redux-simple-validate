'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_validate2.default.validators.maxlength = function (value, options) {
  return _validate2.default.validators.length(value, {
    maximum: options.maxlength,
    message: options.message
  });
};
//# sourceMappingURL=maxlength.js.map