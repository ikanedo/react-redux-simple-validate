'use strict';

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

require('./equalTo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validator Adapter - equalTo', function () {
  var constraints = void 0;
  var constraints2 = void 0;
  var constraints3 = void 0;

  beforeEach(function () {
    constraints = {
      confirmPassword: {
        equalTo: {
          equalTo: '[name=password]',
          message: '^password does not match'
        }
      }
    };

    constraints2 = {
      confirmPassword: {
        equalTo: {
          equalTo: '[name="password"]',
          message: '^password does not match'
        }
      }
    };

    constraints3 = {
      confirmPassword: {
        equalTo: {
          equalTo: "[name='password']", // eslint-disable-line
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

    var hasErrorMsg2 = (0, _validate2.default)({
      password: 'match',
      confirmPassword: 'match'
    }, constraints2);
    expect(hasErrorMsg2).toBeUndefined();

    var hasErrorMsg3 = (0, _validate2.default)({
      password: 'match',
      confirmPassword: 'match'
    }, constraints3);
    expect(hasErrorMsg3).toBeUndefined();
  });
});
//# sourceMappingURL=equalToSpec.js.map