'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

require('./minlength');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validator Adapter - minlength', function () {
  var constraints = void 0;

  beforeEach(function () {
    constraints = {
      minlength: {
        minlength: 4,
        message: '^4 characters or more'
      }
    };
  });

  it('SHOULD return error message WHEN value is less than 4 characters', function () {
    var hasErrorMsg = _validate2.default.single('123', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('4 characters or more');
  });

  it('SHOULD return undefined WHEN value is 4 characters or more', function () {
    var hasErrorMsg = _validate2.default.single('1234', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
//# sourceMappingURL=minlengthSpec.js.map