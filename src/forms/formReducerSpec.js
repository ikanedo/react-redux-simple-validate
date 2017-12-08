import forms from './formReducer';
import * as CONST from './formConstants';

describe('Form Reducer', () => {
  const FORM_NAME = 'Giftcard';
  let prevState;

  beforeEach(() => {
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

  describe('WHEN action type does not exist', () => {
    it('SHOULD return the last know state', () => {
      const state = forms({
        oldMember: 1
      }, {
        type: 'NON_EXISTENT'
      });
      expect(state).toHaveMember('oldMember');
    });
  });

  describe('FORM_INITIAL_DATA', () => {
    describe('WHEN initial values AND/OR errors are given', () => {
      it('SHOULD return the given values as part of the state', () => {
        const PIN_VALUE = '1234';
        const state = forms({}, {
          type: CONST.FORM_INITIAL_DATA,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
      });

      it('SHOULD return the given errors as part of the state', () => {
        const ERROR_VALUE = 'this is an error';
        const state = forms({}, {
          type: CONST.FORM_INITIAL_DATA,
          formName: FORM_NAME,
          errors: {
            'gx-pin': [ERROR_VALUE]
          }
        });
        expect(state[FORM_NAME].errors).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors['gx-pin'][0]).toBe(ERROR_VALUE);
      });
    });
  });

  describe('FORM_DATA_REPLACE', () => {
    describe('WHEN values AND/OR errors are given', () => {
      it('SHOULD return the given values as part of the state', () => {
        const PIN_VALUE = '1234';
        const state = forms({}, {
          type: CONST.FORM_DATA_REPLACE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
      });

      it('SHOULD return the given errors as part of the state', () => {
        const ERROR_VALUE = 'this is an error';
        const state = forms({}, {
          type: CONST.FORM_DATA_REPLACE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': [ERROR_VALUE]
          }
        });
        expect(state[FORM_NAME].errors).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors['gx-pin'][0]).toBe(ERROR_VALUE);
      });
    });
  });

  describe('FORM_DATA_MERGE', () => {
    describe('WHEN values AND/OR errors are given', () => {
      it('SHOULD return the given values as part of the state', () => {
        const PIN_VALUE = '1234';
        const state = forms({}, {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
      });

      it('SHOULD return the given errors as part of the state', () => {
        const ERROR_VALUE = 'this is an error';
        const state = forms({}, {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': [ERROR_VALUE]
          }
        });
        expect(state[FORM_NAME].errors).toBeNonEmptyObject();
        expect(state[FORM_NAME].errors['gx-pin'][0]).toBe(ERROR_VALUE);
      });

      it('SHOULD return existing values + new values as part of the state', () => {
        const PIN_VALUE = '1234';
        const NUMBER_VALUE = 'A00001';
        const state = forms({
          [FORM_NAME]: {
            values: {
              'gx-number': 'A00001'
            }
          }
        }, {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
        expect(state[FORM_NAME].values['gx-pin']).toBe(PIN_VALUE);
        expect(state[FORM_NAME].values['gx-number']).toBe(NUMBER_VALUE);
      });

      it('SHOULD return remove all errors WHEN errors are existing', () => {
        const PIN_VALUE = '1234';
        const state = forms({
          [FORM_NAME]: {
            errors: {
              'gx-number': ['this is an error']
            }
          }
        }, {
          type: CONST.FORM_DATA_MERGE,
          formName: FORM_NAME,
          values: {
            'gx-pin': PIN_VALUE
          }
        });
        expect(state[FORM_NAME].errors).toBeDefined();
      });
    });
  });

  describe('FORM_INPUT_CHANGE', () => {
    describe('WHEN an input value is given', () => {
      it('SHOULD return the given input field value as part of the state', () => {
        const state = forms({}, {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
      });

      it('SHOULD return the state of sibling inputs, IF there are any', () => {
        const state = forms({
          [FORM_NAME]: {
            values: {
              'gx-number': '007'
            }
          }
        }, {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });
        expect(state[FORM_NAME].values).toBeNonEmptyObject();
      });

      it('SHOULD always return a new state', () => {
        const oldState = {
          [FORM_NAME]: {
            values: {
              'gx-pin': '1234'
            }
          }
        };
        const state = forms(oldState, {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });
        expect(state).not.toBe(oldState);
        expect(state[FORM_NAME].values['gx-pin']).toBe(oldState[FORM_NAME].values['gx-pin']);
      });

      it('SHOULD always return all other state members (like form errors)', () => {
        const oldState = {
          dummyProp: 1,
          [FORM_NAME]: {
            values: {
              'gx-pin': '1234'
            },
            errors: {
              'gx-pin': ['error message']
            }
          }
        };
        const state = forms(oldState, {
          type: CONST.FORM_INPUT_CHANGE,
          formName: FORM_NAME,
          formInput: {
            'gx-pin': '1234'
          }
        });

        expect(state).toHaveMember('dummyProp');
      });
    });
  });

  describe('FORM_VALIDATE', () => {
    describe('WHEN error messages are present', () => {
      it('SHOULD return error message', () => {
        const state = forms({}, {
          type: CONST.FORM_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': ['error']
          }
        });
        expect(state[FORM_NAME]).toBeNonEmptyObject();
        expect(state.Giftcard.errors['gx-pin']).toBeArrayOfStrings();
      });

      it('SHOULD be able to return multiple error messages', () => {
        const state = forms(prevState, {
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

      it('SHOULD remove error messages WHEN no error is present', () => {
        const state = forms(prevState, {
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

  describe('FORM_SINGLE_VALIDATE', () => {
    describe('WHEN error messages are present', () => {
      it('SHOULD return error message', () => {
        const state = forms({}, {
          type: CONST.FORM_SINGLE_VALIDATE,
          formName: FORM_NAME,
          errors: {
            'gx-pin': ['error']
          }
        });
        expect(state[FORM_NAME]).toBeNonEmptyObject();
        expect(state.Giftcard.errors['gx-pin']).toBeArrayOfStrings();
      });

      it('SHOULD be able to return multiple error messages', () => {
        const state = forms(prevState, {
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

      it('SHOULD remove error messages WHEN no error is present', () => {
        const state = forms(prevState, {
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

  describe('FORM_RESET', () => {
    it('SHOULD reset the form state AND empty the input fields', () => {
      const state = forms(prevState, {
        type: CONST.FORM_RESET,
        formName: FORM_NAME
      });
      expect(state).toBeNonEmptyObject();
      expect(state[FORM_NAME].errors).toBeEmptyObject();
      expect(state[FORM_NAME].values).toBeEmptyObject();
    });
  });

  describe('FORM_TRIGGER_VALIDATION', () => {
    it('SHOULD set the validation trigger to be true', () => {
      const state = forms(prevState, {
        type: CONST.FORM_TRIGGER_VALIDATION,
        formName: FORM_NAME,
        trigger: true
      });
      expect(state).toBeNonEmptyObject();
      expect(state[FORM_NAME].isTriggerValidation).toBe(true);
    });

    it('SHOULD set the validation trigger to be false', () => {
      const state = forms(prevState, {
        type: CONST.FORM_TRIGGER_VALIDATION,
        formName: FORM_NAME,
        trigger: false
      });
      expect(state).toBeNonEmptyObject();
      expect(state[FORM_NAME].isTriggerValidation).toBe(false);
    });
  });
});

