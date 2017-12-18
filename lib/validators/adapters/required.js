'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_validate2.default.validators.required = function (value, options) {
  if (options.required && _validate2.default.isEmpty(value)) {
    return options.message;
  }

  return undefined;
};
//# sourceMappingURL=required.js.map