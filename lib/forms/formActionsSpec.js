'use strict';

var _formActions = require('./formActions');

var Action = _interopRequireWildcard(_formActions);

var _formConstants = require('./formConstants');

var CONST = _interopRequireWildcard(_formConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Form Actions', function () {
  describe('setInitialData', function () {
    describe('Tell the reducer to seed the form with initial values AND/OR errors', function () {
      it('SHOULD return with the correct action type', function () {
        var action = Action.setInitialData('name');
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_INITIAL_DATA);
      });

      it('SHOULD return with the given form name', function () {
        var action = Action.setInitialData('name', { errors: {} });
        expect(action).toHaveMember('formName');
        expect(action.formName).toBe('name');
      });

      it('SHOULD return with an error object', function () {
        var action = Action.setInitialData('name', {});
        expect(action).toHaveMember('errors');
      });

      it('SHOULD return with a values object', function () {
        var action = Action.setInitialData('name', {}, {});
        expect(action).toHaveMember('values');
      });
    });
  });

  describe('setDataReplace', function () {
    describe('Tell the reducer to replace the form data with values AND/OR errors', function () {
      it('SHOULD return with the correct action type', function () {
        var action = Action.setDataReplace('name');
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_DATA_REPLACE);
      });

      it('SHOULD return with the given form name', function () {
        var action = Action.setDataReplace('name', { errors: {} });
        expect(action).toHaveMember('formName');
        expect(action.formName).toBe('name');
      });

      it('SHOULD return with an error object', function () {
        var action = Action.setDataReplace('name', {});
        expect(action).toHaveMember('errors');
      });

      it('SHOULD return with a values object', function () {
        var action = Action.setDataReplace('name', {}, {});
        expect(action).toHaveMember('values');
      });
    });
  });

  describe('setDataReplace', function () {
    describe('Tell the reducer to merge the form values AND remove errors', function () {
      it('SHOULD return with the correct action type', function () {
        var action = Action.setDataMerge('name');
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_DATA_MERGE);
      });

      it('SHOULD return with the given form name', function () {
        var action = Action.setDataMerge('name', { errors: {} });
        expect(action).toHaveMember('formName');
        expect(action.formName).toBe('name');
      });

      it('SHOULD return with an error object', function () {
        var action = Action.setDataMerge('name', {});
        expect(action).toHaveMember('errors');
      });

      it('SHOULD return with a values object', function () {
        var action = Action.setDataMerge('name', {}, {});
        expect(action).toHaveMember('values');
      });
    });
  });

  describe('setValidity', function () {
    describe('Tell the reducer whether this form has error messages or not', function () {
      it('SHOULD return with the correct action type', function () {
        var action = Action.setValidity({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_VALIDATE);
      });

      it('SHOULD return an error message array member', function () {
        var action = Action.setValidity({});
        expect(action).toHaveMember('errors');
      });
    });
  });

  describe('setInputValue', function () {
    describe('Tell the reducer that the value of an input element has changed', function () {
      it('SHOULD return with the correct action type', function () {
        var action = Action.setInputValue({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_INPUT_CHANGE);
      });

      it('SHOULD return with a formInput member', function () {
        var action = Action.setInputValue({});
        expect(action).toHaveMember('formInput');
      });
    });
  });

  describe('reset', function () {
    describe('Tell the reducer to clean the form by removing all values and error messages', function () {
      it('SHOULD return with the correct action type', function () {
        var action = Action.reset({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_RESET);
      });
    });
  });

  describe('triggerValidate', function () {
    describe('Tell the reducer to validate the form given', function () {
      it('SHOULD return with the correct action type', function () {
        var action = Action.triggerValidate({});
        expect(action).toHaveMember('type');
        expect(action.type).toBe(CONST.FORM_TRIGGER_VALIDATION);
      });

      it('SHOULD return with the given params - formName, trigger', function () {
        var action = Action.triggerValidate({
          formName: 'dummy',
          trigger: false
        });
        expect(action).toHaveMember('formName');
        expect(action).toHaveMember('trigger');
      });
    });
  });
});
//# sourceMappingURL=formActionsSpec.js.map