'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_validate2.default.validators.equalTo = function (value, options, attribute, attributes) {
  return _validate2.default.validators.equality(value, {
    attribute: options.equalTo.replace(/\[name=|\]|"|'/g, ''),
    message: options.message
  }, attribute, attributes);
};
//# sourceMappingURL=equalTo.js.map