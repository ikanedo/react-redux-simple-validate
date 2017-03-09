'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

require('./required');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validator Adapter - required', function () {
  var constraints = void 0;

  beforeEach(function () {
    constraints = {
      required: {
        required: true,
        message: '^This is a required field'
      }
    };
  });

  it('SHOULD return error message WHEN value is empty', function () {
    var hasErrorMsg = _validate2.default.single('', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('This is a required field');
  });

  it('SHOULD return error message WHEN value is whitespace', function () {
    var hasErrorMsg = _validate2.default.single('       ', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('This is a required field');
  });

  it('SHOULD return undefined WHEN value is present', function () {
    var hasErrorMsg = _validate2.default.single('Kane', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
//# sourceMappingURL=requiredSpec.js.map