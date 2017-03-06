import validate from 'validate.js';
import 'src/validators/adapters/equalTo';

describe('Validator Adapter - equalTo', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      confirmPassword: {
        equalTo: {
          equalTo: '[name=password]',
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
  });
});
