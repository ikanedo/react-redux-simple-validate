'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

require('./pattern');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validator Adapter - pattern', function () {
  var constraints = void 0;

  beforeEach(function () {
    constraints = {
      pattern: {
        pattern: "^[A-Za-z0-9._'%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$|^$",
        message: '^does not match pattern'
      }
    };
  });

  it('SHOULD return error message WHEN pattern does not match', function () {
    var hasErrorMsg = _validate2.default.single('123', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('does not match pattern');
  });

  it('SHOULD return undefined WHEN value matches the pattern', function () {
    var hasErrorMsg = _validate2.default.single('kb@gmail.com', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
//# sourceMappingURL=patternSpec.js.map