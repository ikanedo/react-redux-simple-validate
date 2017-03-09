'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

require('./equalTo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validator Adapter - equalTo', function () {
  var constraints = void 0;

  beforeEach(function () {
    constraints = {
      confirmPassword: {
        equalTo: {
          equalTo: '[name=password]',
          message: '^password does not match'
        }
      }
    };
  });

  it('SHOULD return error WHEN value does not match with attribute', function () {
    var hasErrorMsg = (0, _validate2.default)({
      password: 'match',
      confirmPassword: 'doesNotMatch'
    }, constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg.confirmPassword).toBeArrayOfStrings();
    expect(hasErrorMsg.confirmPassword).toContain('password does not match');
  });

  it('SHOULD return undefined WHEN value matches given attribute', function () {
    var hasErrorMsg = (0, _validate2.default)({
      password: 'match',
      confirmPassword: 'match'
    }, constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
//# sourceMappingURL=equalToSpec.js.map