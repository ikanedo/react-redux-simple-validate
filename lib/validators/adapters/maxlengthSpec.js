'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

require('./maxlength');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validator Adapter - maxlength', function () {
  var constraints = void 0;

  beforeEach(function () {
    constraints = {
      maxlength: {
        maxlength: 4,
        message: '^3 characters or less'
      }
    };
  });

  it('SHOULD return error message WHEN value is more than 4 characters', function () {
    var hasErrorMsg = _validate2.default.single('12345', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('3 characters or less');
  });

  it('SHOULD return undefined WHEN value is 4 characters or less', function () {
    var hasErrorMsg = _validate2.default.single('1234', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
//# sourceMappingURL=maxlengthSpec.js.map