'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formUtils = require('./formUtils');

var utils = _interopRequireWildcard(_formUtils);

var _enzyme = require('enzyme');

var _formGroup = require('./formGroup');

var _formGroup2 = _interopRequireDefault(_formGroup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form Utilities', function () {
  describe('isAReactEl', function () {
    it('SHOULD return true if this is a React element', function () {
      expect(utils.isAReactEl(_react2.default.createElement('input', null))).toBe(true);
    });

    it('SHOULD return false if this is NOT a React element', function () {
      expect(utils.isAReactEl(undefined)).toBe(false);
    });
  });

  describe('isAFormEl', function () {
    it('SHOULD return true if this is an input element', function () {
      expect(utils.isAFormEl(_react2.default.createElement('input', null))).toBe(true);
    });

    it('SHOULD return true if this is a textarea element', function () {
      expect(utils.isAFormEl(_react2.default.createElement('textarea', null))).toBe(true);
    });

    it('SHOULD return true if this is a select element', function () {
      expect(utils.isAFormEl(_react2.default.createElement('select', null))).toBe(true);
    });

    it('SHOULD return false if this is NOT a known form element', function () {
      expect(utils.isAFormEl(_react2.default.createElement('div', null))).toBe(false);
    });
  });

  describe('isAFormGroup', function () {
    it('SHOULD return true if this is a FormGroup element', function () {
      expect(utils.isAFormGroup(_react2.default.createElement(_formGroup2.default, null))).toBe(true);
    });

    it('SHOULD return false if this is NOT a FormGroup element', function () {
      expect(utils.isAFormGroup(_react2.default.createElement('div', null))).toBe(false);
    });
  });

  describe('getFormData', function () {
    describe('Transforms the input values from the DOM as a plain object', function () {
      var nonFormComponent = void 0;
      var dummy = void 0;
      var decoratedFormComponent = void 0;
      var mockRefs = void 0;
      var formValues = void 0;

      beforeEach(function () {
        mockRefs = {
          firstName: {
            value: 'john doe'
          },
          email: {
            value: 'john@doe.com'
          },
          password: {
            value: 'password123'
          },
          remember: {
            value: 'not this',
            checked: true
          },
          radioItemDelivery: {
            value: 'delivery',
            checked: false
          },
          radioItemCollection: {
            value: 'collection',
            checked: true
          },
          country: {
            value: 'GB'
          },
          notes: {
            value: 'This is a note.'
          }
        };
      });

      beforeEach(function () {
        dummy = function dummy() {
          return _react2.default.createElement(
            'div',
            null,
            'this is a custom react component'
          );
        };
      });

      beforeEach(function () {
        decoratedFormComponent = (0, _enzyme.shallow)(_react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', { type: 'text', name: 'firstName' }),
          _react2.default.createElement('input', { type: 'email', name: 'email' }),
          _react2.default.createElement('input', { type: 'password', name: 'password' }),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { type: 'checkbox', name: 'remember' })
          ),
          _react2.default.createElement('input', { type: 'radio', name: 'radioItem', value: 'Delivery' }),
          _react2.default.createElement('input', { type: 'radio', name: 'radioItem', value: 'Collection' }),
          _react2.default.createElement(
            'select',
            { name: 'country' },
            _react2.default.createElement(
              'option',
              { value: 'None' },
              'Please Select'
            ),
            _react2.default.createElement(
              'option',
              { value: 'GB' },
              'United Kingdom'
            ),
            _react2.default.createElement(
              'option',
              { value: 'DE' },
              'Germany'
            )
          ),
          _react2.default.createElement('textarea', { name: 'notes' })
        ));
      });

      beforeEach(function () {
        nonFormComponent = (0, _enzyme.shallow)(_react2.default.createElement(
          'div',
          null,
          'some root level string that needs to be ignored',
          _react2.default.createElement('dummy', null),
          _react2.default.createElement(
            'div',
            { id: 'dummy' },
            'dummy'
          ),
          _react2.default.createElement(
            'button',
            null,
            'dummy button'
          )
        ));
      });

      beforeEach(function () {
        formValues = utils.getFormData(decoratedFormComponent.prop('children'), mockRefs);
      });

      it('SHOULD ignore NON form elements like - strings, divs, buttons, custom components', function () {
        var values = utils.getFormData(nonFormComponent.prop('children'), null);
        expect(values).toBeEmptyObject();
      });

      it('SHOULD return values for regular inputs - text, email, password', function () {
        expect(formValues.firstName).toBe(mockRefs.firstName.value);
        expect(formValues.email).toBe(mockRefs.email.value);
        expect(formValues.password).toBe(mockRefs.password.value);
      });

      it('SHOULD return values for checkbox input', function () {
        expect(formValues.remember).toBeBoolean();
        expect(formValues.remember).toBe(mockRefs.remember.checked);
      });

      it('SHOULD return values for radio input', function () {
        expect(formValues.radioItem).toBe(mockRefs.radioItemCollection.value);
      });

      it('SHOULD return values for select list', function () {
        expect(formValues.country).toBe(mockRefs.country.value);
      });

      it('SHOULD return values for textareas', function () {
        expect(formValues.notes).toBe(mockRefs.notes.value);
      });
    });
  });

  describe('filterValidation', function () {
    var validation = {
      rules: {
        firstName: {
          required: true
        },
        lastName: {
          required: true
        },
        middleName: {
          required: true
        },
        nickName: {
          required: true
        }
      },
      messages: {
        firstName: {
          required: 'Please enter your first name'
        },
        lastName: {
          required: 'Please enter your last name'
        },
        middleName: {
          required: 'Please enter your middle name'
        },
        nickName: {
          required: 'Please enter your nick name'
        }
      }
    };

    it('SHOULD return only the rules and messages matching the given inputs', function () {
      var children = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { name: 'firstName' }),
        _react2.default.createElement('input', { name: 'lastName' })
      );
      var validationRules = utils.filterValidation({
        children: children,
        validation: validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given textarea', function () {
      var children = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('textarea', { name: 'firstName', type: 'text' }),
        _react2.default.createElement('textarea', { name: 'lastName', type: 'text' })
      );
      var validationRules = utils.filterValidation({
        children: children,
        validation: validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given select', function () {
      var children = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'select',
          { name: 'firstName' },
          _react2.default.createElement(
            'option',
            null,
            'John'
          )
        ),
        _react2.default.createElement(
          'select',
          { name: 'lastName' },
          _react2.default.createElement(
            'option',
            null,
            'Smith'
          )
        )
      );
      var validationRules = utils.filterValidation({
        children: children,
        validation: validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given radio and checkbox', function () {
      var children = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { name: 'firstName', type: 'checkbox' }),
        _react2.default.createElement('input', { name: 'lastName', type: 'radio' })
      );
      var validationRules = utils.filterValidation({
        children: children,
        validation: validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given nested form elements', function () {
      var children = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('div', null),
              'string text',
              _react2.default.createElement('input', { name: 'firstName', type: 'checkbox' }),
              _react2.default.createElement('input', { name: 'lastName', type: 'radio' })
            )
          )
        )
      );
      var validationRules = utils.filterValidation({
        children: children,
        validation: validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });
  });

  describe('omitValidation', function () {
    var omitValidation = void 0;
    var validation = void 0;
    beforeEach(function () {
      validation = {
        rules: {
          firstName: {
            required: true
          },
          lastName: {
            required: true
          },
          line1: {
            required: true
          }
        },
        messages: {
          firstName: {
            required: 'Please enter your first name'
          },
          lastName: {
            required: 'Please enter your last name'
          },
          line1: {
            required: 'Please enter your Address'
          }
        }
      };
      omitValidation = utils.omitValidation(validation, ['firstName', 'lastName']);
    });

    it('SHOULD return rules and messages members', function () {
      expect(omitValidation).toHaveMember('rules');
      expect(omitValidation).toHaveMember('messages');
    });

    it('SHOULD return picked rules', function () {
      expect(omitValidation.rules).toHaveMember('line1');
      expect(omitValidation.rules.line1).toHaveMember('required');
    });

    it('SHOULD return picked messages', function () {
      expect(omitValidation.messages).toHaveMember('line1');
      expect(omitValidation.messages.line1).toHaveMember('required');
      expect(omitValidation.messages.line1.required).toBe(validation.messages.line1.required);
    });

    it('SHOULD NOT return omitted rules', function () {
      expect(omitValidation.rules).not.toHaveMember('firstName');
      expect(omitValidation.rules).not.toHaveMember('lastName');
    });

    it('SHOULD NOT return omitted messages', function () {
      expect(omitValidation.messages).not.toHaveMember('firstName');
      expect(omitValidation.messages).not.toHaveMember('lastName');
    });
  });
});
//# sourceMappingURL=formUtilsSpec.js.map