'use strict';

var _validator = require('./validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  TODO: still need to create adapters for 'async' validation
  This use case is to check whether an email is already registered
*/

describe('Validator', function () {
  describe('An adapter which transforms the backend validation rules and message\n     to the validate.js contraints format', function () {
    var formValidator = void 0;
    var rulesAndMessageMock = void 0;
    var constraints = void 0;

    beforeEach(function () {
      rulesAndMessageMock = {
        rules: {
          'gx-number': {
            required: true
          },
          'gx-pin': {
            required: true,
            minlength: 4
          }
        },
        messages: {
          'gx-number': {
            required: function required() {
              return 'Please enter a valid giftcard number';
            }
          },
          'gx-pin': {
            required: 'Please enter a valid giftcard pin',
            minlength: 'It has to be 4 characters long'
          }
        }
      };
    });

    describe('Constructor', function () {
      describe('Receives a rules and message JSON object and stores it for internal reuse', function () {
        beforeEach(function () {
          formValidator = new _validator2.default(rulesAndMessageMock);
          constraints = formValidator.constraints;
        });

        it('SHOULD adapt JSON rules and message to a compatible validator.js constraints', function () {
          expect(constraints.hasOwnProperty('gx-number')).toBe(true);
          expect(constraints.hasOwnProperty('gx-pin')).toBe(true);
          expect(constraints['gx-number'].hasOwnProperty('required')).toBe(true);
          expect(constraints['gx-number'].required.hasOwnProperty('message')).toBe(true);

          var reqMsg = rulesAndMessageMock.messages['gx-pin'].required;
          expect(constraints['gx-pin'].required.message).toContain(reqMsg);
        });
      });
    });

    describe('setConstraints', function () {
      beforeEach(function () {
        formValidator = new _validator2.default(rulesAndMessageMock);
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
        constraints = formValidator.constraints;
      });

      it('SHOULD replace the old constraint with the given constraints', function () {
        expect(constraints['gx-pin']).toBeUndefined();
      });
    });

    describe('validate', function () {
      describe('call this function to validate a set of values', function () {
        var formDataValid = void 0;
        var formDataInvalid = void 0;

        beforeEach(function () {
          formDataValid = {
            'gx-number': '123456789',
            'gx-pin': '1234'
          };
        });

        beforeEach(function () {
          formDataInvalid = {
            'gx-number': '',
            'gx-pin': ''
          };
        });

        it('SHOULD return empty string messages when data is valid', function () {
          var errorMessages = formValidator.validate(formDataValid);
          var errorMessagesWithConstraints = formValidator.validate(formDataValid, constraints);
          expect(errorMessages).toBeEmptyString();
          expect(errorMessagesWithConstraints).toBeEmptyString();
        });

        it('SHOULD return error messages when data is invalid', function () {
          var errorMessages = formValidator.validate(formDataInvalid);
          var errorMessagesWithConstraints = formValidator.validate(formDataInvalid, constraints);

          expect(errorMessages).toBeDefined();
          expect(errorMessages).toBeNonEmptyObject();
          expect(errorMessages).toHaveArrayOfStrings('gx-number');

          expect(errorMessagesWithConstraints).toBeDefined();
          expect(errorMessagesWithConstraints).toBeNonEmptyObject();
          expect(errorMessagesWithConstraints).toHaveArrayOfStrings('gx-number');
        });
      });
    });

    describe('single', function () {
      describe('call this function to validate a single value', function () {
        var customConstraint = void 0;

        beforeEach(function () {
          customConstraint = {
            'gx-number': {
              minlength: {
                minlength: 10,
                message: '^wrong'
              }
            }
          };
        });

        it('SHOULD return empty string messages when data is valid', function () {
          var errorMessages = formValidator.single('gx-number', {
            'gx-number': 'value'
          });
          expect(errorMessages).toBeEmptyString();
        });

        it('SHOULD return error messages when data is invalid', function () {
          var errorMessages = formValidator.single('gx-number', {
            'gx-number': null
          });
          expect(errorMessages).toBeDefined();
          expect(errorMessages).toBeNonEmptyArray();
          expect(errorMessages).toBeArrayOfStrings('gx-number');
        });

        it('SHOULD use passed custom constraints', function () {
          var errorMessages = formValidator.single('gx-number', {
            'gx-number': 'value'
          }, customConstraint);
          expect(errorMessages).toBeDefined();
          expect(errorMessages).toBeNonEmptyArray();
          expect(errorMessages).toBeArrayOfStrings('gx-number');
          expect(errorMessages).toContain('wrong');
        });
      });
    });
  });
});
//# sourceMappingURL=validatorSpec.js.map