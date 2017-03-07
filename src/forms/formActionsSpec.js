import * as Action from './formActions';
import * as CONST from './formConstants';

describe('Form Actions', () => {
  describe('setInitialData', () => {
    describe('Tell the reducer to seed the form with initial values AND/OR errors', () => {
      it('SHOULD return with the correct action type', () => {
        const action = Action.setInitialData('name');
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_INITIAL_DATA);
      });

      it('SHOULD return with the given form name', () => {
        const action = Action.setInitialData('name', { errors: {} });
        expect(action).toHaveMember('formName');
        expect(action.formName).toBe('name');
      });

      it('SHOULD return with an error object', () => {
        const action = Action.setInitialData('name', {});
        expect(action).toHaveMember('errors');
      });

      it('SHOULD return with a values object', () => {
        const action = Action.setInitialData('name', {}, {});
        expect(action).toHaveMember('values');
      });
    });
  });

  describe('setDataReplace', () => {
    describe('Tell the reducer to replace the form data with values AND/OR errors', () => {
      it('SHOULD return with the correct action type', () => {
        const action = Action.setDataReplace('name');
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_DATA_REPLACE);
      });

      it('SHOULD return with the given form name', () => {
        const action = Action.setDataReplace('name', { errors: {} });
        expect(action).toHaveMember('formName');
        expect(action.formName).toBe('name');
      });

      it('SHOULD return with an error object', () => {
        const action = Action.setDataReplace('name', {});
        expect(action).toHaveMember('errors');
      });

      it('SHOULD return with a values object', () => {
        const action = Action.setDataReplace('name', {}, {});
        expect(action).toHaveMember('values');
      });
    });
  });

  describe('setDataReplace', () => {
    describe('Tell the reducer to merge the form values AND remove errors', () => {
      it('SHOULD return with the correct action type', () => {
        const action = Action.setDataMerge('name');
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_DATA_MERGE);
      });

      it('SHOULD return with the given form name', () => {
        const action = Action.setDataMerge('name', { errors: {} });
        expect(action).toHaveMember('formName');
        expect(action.formName).toBe('name');
      });

      it('SHOULD return with an error object', () => {
        const action = Action.setDataMerge('name', {});
        expect(action).toHaveMember('errors');
      });

      it('SHOULD return with a values object', () => {
        const action = Action.setDataMerge('name', {}, {});
        expect(action).toHaveMember('values');
      });
    });
  });

  describe('setValidity', () => {
    describe('Tell the reducer whether this form has error messages or not', () => {
      it('SHOULD return with the correct action type', () => {
        const action = Action.setValidity({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_VALIDATE);
      });

      it('SHOULD return an error message array member', () => {
        const action = Action.setValidity({});
        expect(action).toHaveMember('errors');
      });
    });
  });

  describe('setInputValue', () => {
    describe('Tell the reducer that the value of an input element has changed', () => {
      it('SHOULD return with the correct action type', () => {
        const action = Action.setInputValue({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_INPUT_CHANGE);
      });

      it('SHOULD return with a formInput member', () => {
        const action = Action.setInputValue({});
        expect(action).toHaveMember('formInput');
      });
    });
  });

  describe('reset', () => {
    describe('Tell the reducer to clean the form by removing all values and error messages', () => {
      it('SHOULD return with the correct action type', () => {
        const action = Action.reset({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_RESET);
      });
    });
  });

  describe('triggerValidate', () => {
    describe('Tell the reducer to validate the form given', () => {
      it('SHOULD return with the correct action type', () => {
        const action = Action.triggerValidate({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_TRIGGER_VALIDATION);
      });

      it('SHOULD return with the given params - formName, trigger', () => {
        const action = Action.triggerValidate({
          formName: 'dummy',
          trigger: false
        });
        expect(action).toHaveMember('formName');
        expect(action).toHaveMember('trigger');
      });
    });
  });
});
