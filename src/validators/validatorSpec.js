import Validator from './validator';

/*
  TODO: still need to create adapters for 'async' validation
  This use case is to check whether an email is already registered
*/

describe('Validator', () => {
  describe(
    `An adapter which transforms the backend validation rules and message
     to the validate.js contraints format`
    , () => {
      let formValidator;
      let rulesAndMessageMock;
      let constraints;

      beforeEach(() => {
        rulesAndMessageMock = {
          rules: {
            'gx-number': {
              required: true,
              minlength: 4,
              maxlength: 50
            },
            'gx-pin': {
              required: true,
              minlength: 4
            }
          },
          messages: {
            'gx-number': {
              required() {
                return 'Please enter a valid giftcard number';
              },
              minlength: {
                nestedMsg: 'Please show nested message' // for babel coverage
              },
              maxlength: undefined // for babel coverage
            },
            'gx-pin': {
              required: 'Please enter a valid giftcard pin',
              minlength: 'It has to be 4 characters long',
            }
          }
        };
      });

      describe('Constructor', () => {
        describe('Receives a rules and message JSON object and stores it for internal reuse', () => {
          beforeEach(() => {
            formValidator = new Validator(rulesAndMessageMock);
            constraints = formValidator.constraints; // eslint-disable-line
          });

          it('SHOULD adapt JSON rules and message to a compatible validator.js constraints', () => {
            expect(constraints.hasOwnProperty('gx-number')).toBe(true); // eslint-disable-line
            expect(constraints.hasOwnProperty('gx-pin')).toBe(true); // eslint-disable-line
            expect(constraints['gx-number'].hasOwnProperty('required')).toBe(true); // eslint-disable-line
            expect(constraints['gx-number'].required.hasOwnProperty('message')).toBe(true); // eslint-disable-line

            const reqMsg = rulesAndMessageMock.messages['gx-pin'].required;
            expect(constraints['gx-pin'].required.message).toContain(reqMsg);
          });
        });
      });

      describe('setConstraints', () => {
        beforeEach(() => {
          formValidator = new Validator(rulesAndMessageMock);
          formValidator.setConstraints({
            rules: {
              'gx-number': {
                required: true
              }
            },
            messages: {
              'gx-number': {
                required: 'Please enter a valid giftcard number'
              }
            }
          });
          constraints = formValidator.constraints; // eslint-disable-line
        });

        it('SHOULD replace the old constraint with the given constraints', () => {
          expect(constraints['gx-pin']).toBeUndefined();
        });
      });

      describe('validate', () => {
        describe('call this function to validate a set of values', () => {
          let formDataValid;
          let formDataInvalid;

          beforeEach(() => {
            formDataValid = {
              'gx-number': '123456789',
              'gx-pin': '1234'
            };
          });

          beforeEach(() => {
            formDataInvalid = {
              'gx-number': '',
              'gx-pin': ''
            };
          });

          it('SHOULD return empty string messages when data is valid', () => {
            const errorMessages = formValidator.validate(formDataValid);
            const errorMessagesWithConstraints = formValidator.validate(formDataValid, constraints);
            expect(errorMessages).toBeEmptyString();
            expect(errorMessagesWithConstraints).toBeEmptyString();
          });

          it('SHOULD return error messages when data is invalid', () => {
            const errorMessages = formValidator.validate(formDataInvalid);
            const errorMessagesWithConstraints = formValidator.validate(formDataInvalid, constraints);

            expect(errorMessages).toBeDefined();
            expect(errorMessages).toBeNonEmptyObject();
            expect(errorMessages).toHaveArrayOfStrings('gx-number');

            expect(errorMessagesWithConstraints).toBeDefined();
            expect(errorMessagesWithConstraints).toBeNonEmptyObject();
            expect(errorMessagesWithConstraints).toHaveArrayOfStrings('gx-number');
          });
        });
      });

      describe('single', () => {
        describe('call this function to validate a single value', () => {
          let customConstraint;

          beforeEach(() => {
            customConstraint = {
              'gx-number': {
                minlength: {
                  minlength: 10,
                  message: '^wrong'
                }
              }
            };
          });

          it('SHOULD return empty string messages when data is valid', () => {
            const errorMessages = formValidator.single('gx-number', {
              'gx-number': 'value'
            });
            expect(errorMessages).toBeEmptyString();
          });

          it('SHOULD return error messages when data is invalid', () => {
            const errorMessages = formValidator.single('gx-number', {
              'gx-number': null
            });
            expect(errorMessages).toBeDefined();
            expect(errorMessages).toBeNonEmptyArray();
            expect(errorMessages).toBeArrayOfStrings('gx-number');
          });

          it('SHOULD use passed custom constraints', () => {
            const errorMessages = formValidator.single('gx-number', {
              'gx-number': 'value'
            }, customConstraint);
            expect(errorMessages).toBeDefined();
            expect(errorMessages).toBeNonEmptyArray();
            expect(errorMessages).toBeArrayOfStrings('gx-number');
            expect(errorMessages).toContain('wrong');
          });
        });
      });
    }
  );
});
