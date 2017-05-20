import validate from 'validate.js';
import './equalTo';

describe('Validator Adapter - equalTo', () => {
  let constraints;
  let constraints2;
  let constraints3;

  beforeEach(() => {
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

  it('SHOULD return error WHEN value does not match with attribute', () => {
    const hasErrorMsg = validate({
      password: 'match',
      confirmPassword: 'doesNotMatch'
    }, constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg.confirmPassword).toBeArrayOfStrings();
    expect(hasErrorMsg.confirmPassword).toContain('password does not match');
  });

  it('SHOULD return undefined WHEN value matches given attribute', () => {
    const hasErrorMsg = validate({
      password: 'match',
      confirmPassword: 'match'
    }, constraints);
    expect(hasErrorMsg).toBeUndefined();

    const hasErrorMsg2 = validate({
      password: 'match',
      confirmPassword: 'match'
    }, constraints2);
    expect(hasErrorMsg2).toBeUndefined();

    const hasErrorMsg3 = validate({
      password: 'match',
      confirmPassword: 'match'
    }, constraints3);
    expect(hasErrorMsg3).toBeUndefined();
  });
});
