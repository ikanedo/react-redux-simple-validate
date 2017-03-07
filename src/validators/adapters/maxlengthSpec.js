import validate from 'validate.js';
import './maxlength';

describe('Validator Adapter - maxlength', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      maxlength: {
        maxlength: 4,
        message: '^3 characters or less'
      }
    };
  });

  it('SHOULD return error message WHEN value is more than 4 characters', () => {
    const hasErrorMsg = validate.single('12345', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('3 characters or less');
  });

  it('SHOULD return undefined WHEN value is 4 characters or less', () => {
    const hasErrorMsg = validate.single('1234', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
