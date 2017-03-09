'use strict';

var _formReducer = require('./formReducer');

var _formReducer2 = _interopRequireDefault(_formReducer);

var _formConstants = require('./formConstants');

var CONST = _interopRequireWildcard(_formConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('Form Reducer', function () {
  var FORM_NAME = 'Giftcard';
  var prevState = void 0;

  beforeEach(function () {
    prevState = {
      Forms: {
        Giftcard: {
          errors: {
            'gx-pin': ['I am an error message']
          }
        }
      }
    };
  });

  describe('WHEN action type does not exist', function () {
    it('SHOULD return the last know state', function () {
      var state = (0, _formReducer2.default)({
        oldMember: 1
      }, {
        type: 'NON_EXISTENT'
      });
      expect(state).toHaveMember('oldMember');
    });
  });

  describe('FORM_INITIAL_DATA', function () {
    describe('WHEN initial values AND/OR errors are given', function () {
      it('SHOULD return the given values as part of the state', function () {
        var PIN_VALUE = '1234';
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_INITIAL_DATA,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values).toImplement({
          'gx-pin': String
        });
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
      });

      it('SHOULD return the given errors as part of the state', function () {
        var ERROR_VALUE = 'this is an error';
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_INITIAL_DATA,
          formName: FORM_NAME,
          errors: {
            'gx-pin': [ERROR_VALUE]
          }
        });
        expect(state[FORM_NAME].errors).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors).toImplement({
          'gx-pin': Array
        });
        expect(state[FORM_NAME].errors['gx-pin'][0]).toBe(ERROR_VALUE);
      });
    });
  });

  describe('FORM_DATA_REPLACE', function () {
    describe('WHEN values AND/OR errors are given', function () {
      it('SHOULD return the given values as part of the state', function () {
        var PIN_VALUE = '1234';
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_DATA_REPLACE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values).toImplement({
          'gx-pin': String
        });
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
      });

      it('SHOULD return the given errors as part of the state', function () {
        var ERROR_VALUE = 'this is an error';
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_DATA_REPLACE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': [ERROR_VALUE]
          }
        });
        expect(state[FORM_NAME].errors).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors).toImplement({
          'gx-pin': Array
        });
        expect(state[FORM_NAME].errors['gx-pin'][0]).toBe(ERROR_VALUE);
      });
    });
  });

  describe('FORM_DATA_MERGE', function () {
    describe('WHEN values AND/OR errors are given', function () {
      it('SHOULD return the given values as part of the state', function () {
        var PIN_VALUE = '1234';
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values).toImplement({
          'gx-pin': String
        });
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
      });

      it('SHOULD return the given errors as part of the state', function () {
        var ERROR_VALUE = 'this is an error';
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': [ERROR_VALUE]
          }
        });
        expect(state[FORM_NAME].errors).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors).toImplement({
          'gx-pin': Array
        });
        expect(state[FORM_NAME].errors['gx-pin'][0]).toBe(ERROR_VALUE);
      });

      it('SHOULD return existing values + new values as part of the state', function () {
        var PIN_VALUE = '1234';
        var NUMBER_VALUE = 'A00001';
        var state = (0, _formReducer2.default)(_defineProperty({}, FORM_NAME, {
          values: {
            'gx-number': 'A00001'
          }
        }), {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values).toImplement({
          'gx-pin': String,
          'gx-number': String
        });
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
        expect(state[FORM_NAME].values['gx-number']).toBe(NUMBER_VALUE);
      });

      it('SHOULD return remove all errors WHEN no errors are given', function () {
        var PIN_VALUE = '1234';
        var state = (0, _formReducer2.default)(_defineProperty({}, FORM_NAME, {
          errors: {
            'gx-number': ['this is an error']
          }
        }), {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].errors).toBeUndefined();
      });

      it('SHOULD return remove all errors WHEN empty error object is given', function () {
        var PIN_VALUE = '1234';
        var state = (0, _formReducer2.default)(_defineProperty({}, FORM_NAME, {
          errors: {
            'gx-number': ['this is an error']
          }
        }), {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          },
          errors: {}
        });
        expect(state[FORM_NAME].errors).toBeEmptyObject();
      });
    });
  });

  describe('FORM_INPUT_CHANGE', function () {
    describe('WHEN an input value is given', function () {
      it('SHOULD return the given input field value as part of the state', function () {
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values).toImplement({
          'gx-pin': String
        });
      });

      it('SHOULD return the state of sibling inputs, IF there are any', function () {
        var state = (0, _formReducer2.default)(_defineProperty({}, FORM_NAME, {
          values: {
            'gx-number': '007'
          }
        }), {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values).toImplement({
          'gx-pin': String,
          'gx-number': String
        });
      });

      it('SHOULD always return a new state', function () {
        var oldState = _defineProperty({}, FORM_NAME, {
          values: {
            'gx-pin': '1234'
          }
        });
        var state = (0, _formReducer2.default)(oldState, {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });
        expect(state).not.toBe(oldState);
        expect(state[FORM_NAME].values['gx-pin']).toBe(oldState[FORM_NAME].values['gx-pin']);
      });

      it('SHOULD always return all other state members (like form errors)', function () {
        var oldState = _defineProperty({
          dummyProp: 1
        }, FORM_NAME, {
          values: {
            'gx-pin': '1234'
          },
          errors: {
            'gx-pin': ['error message']
          }
        });
        var state = (0, _formReducer2.default)(oldState, {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });

        expect(state).toHaveMember('dummyProp');
        expect(state[FORM_NAME]).toImplement({
          errors: Object
        });
      });
    });
  });

  describe('FORM_VALIDATE', function () {
    describe('WHEN error messages are present', function () {
      it('SHOULD return error message', function () {
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': ['error']
          }
        });
        expect(state[FORM_NAME]).toBeNonEmptyObject();
        expect(state[FORM_NAME]).toImplement({
          errors: Object
        });
        expect(state.Giftcard.errors['gx-pin']).toBeArrayOfStrings();
      });

      it('SHOULD be able to return multiple error messages', function () {
        var state = (0, _formReducer2.default)(prevState, {
          type: CONST.FORM_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-number': ['error'],
            'gx-pin': ['error']
          }
        });
        expect(state).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors).toHaveMember('gx-number');
        expect(state[FORM_NAME].errors).toHaveMember('gx-pin');
      });

      it('SHOULD remove error messages WHEN no error is present', function () {
        var state = (0, _formReducer2.default)(prevState, {
          type: CONST.FORM_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-number': ['error'],
            'gx-pin': ''
          }
        });
        expect(state).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors['gx-pin']).toBeEmptyString();
      });
    });
  });

  describe('FORM_SINGLE_VALIDATE', function () {
    describe('WHEN error messages are present', function () {
      it('SHOULD return error message', function () {
        var state = (0, _formReducer2.default)({}, {
          type: CONST.FORM_SINGLE_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': ['error']
          }
        });
        expect(state[FORM_NAME]).toBeNonEmptyObject();
        expect(state[FORM_NAME]).toImplement({
          errors: Object
        });
        expect(state.Giftcard.errors['gx-pin']).toBeArrayOfStrings();
      });

      it('SHOULD be able to return multiple error messages', function () {
        var state = (0, _formReducer2.default)(prevState, {
          type: CONST.FORM_SINGLE_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-number': ['error'],
            'gx-pin': ['error']
          }
        });
        expect(state).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors).toHaveMember('gx-number');
        expect(state[FORM_NAME].errors).toHaveMember('gx-pin');
      });

      it('SHOULD remove error messages WHEN no error is present', function () {
        var state = (0, _formReducer2.default)(prevState, {
          type: CONST.FORM_SINGLE_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-number': ['error'],
            'gx-pin': ''
          }
        });
        expect(state).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors['gx-pin']).toBeEmptyString();
      });
    });
  });

  describe('FORM_RESET', function () {
    it('SHOULD reset the form state AND empty the input fields', function () {
      var state = (0, _formReducer2.default)(prevState, {
        type: CONST.FORM_RESET,
        formName: FORM_NAME
      });
      expect(state).toBeNonEmptyObject();
      expect(state[FORM_NAME].errors).toBeEmptyObject();
      expect(state[FORM_NAME].values).toBeEmptyObject();
    });
  });

  describe('FORM_TRIGGER_VALIDATION', function () {
    it('SHOULD set the validation trigger to be true', function () {
      var state = (0, _formReducer2.default)(prevState, {
        type: CONST.FORM_TRIGGER_VALIDATION,
        formName: FORM_NAME,
        trigger: true
      });
      expect(state).toBeNonEmptyObject();
      expect(state[FORM_NAME].isTriggerValidation).toBe(true);
    });

    it('SHOULD set the validation trigger to be false', function () {
      var state = (0, _formReducer2.default)(prevState, {
        type: CONST.FORM_TRIGGER_VALIDATION,
        formName: FORM_NAME,
        trigger: false
      });
      expect(state).toBeNonEmptyObject();
      expect(state[FORM_NAME].isTriggerValidation).toBe(false);
    });
  });
});
//# sourceMappingURL=formReducerSpec.js.map