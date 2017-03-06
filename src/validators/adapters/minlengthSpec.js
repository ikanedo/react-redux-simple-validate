import validate from 'validate.js';
import 'src/validators/adapters/minlength';

describe('Validator Adapter - minlength', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      minlength: {
        minlength: 4,
        message: '^4 characters or more'
      }
    };
  });

  it('SHOULD return error message WHEN value is less than 4 characters', () => {
    const hasErrorMsg = validate.single('123', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('4 characters or more');
  });

  it('SHOULD return undefined WHEN value is 4 characters or more', () => {
    const hasErrorMsg = validate.single('1234', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
