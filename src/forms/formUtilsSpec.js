import React from 'react';
import * as utils from './formUtils';
import { shallow } from 'enzyme';
import FormGroup from './formGroup';

describe('Form Utilities', () => {
  describe('isAReactEl', () => {
    it('SHOULD return true if this is a React element', () => {
      expect(utils.isAReactEl(<input />)).toBe(true);
    });

    it('SHOULD return false if this is NOT a React element', () => {
      expect(utils.isAReactEl(undefined)).toBe(false);
    });
  });

  describe('isAFormEl', () => {
    it('SHOULD return true if this is an input element', () => {
      expect(utils.isAFormEl(<input />)).toBe(true);
    });

    it('SHOULD return true if this is a textarea element', () => {
      expect(utils.isAFormEl(<textarea />)).toBe(true);
    });

    it('SHOULD return true if this is a select element', () => {
      expect(utils.isAFormEl(<select />)).toBe(true);
    });

    it('SHOULD return false if this is NOT a known form element', () => {
      expect(utils.isAFormEl(<div />)).toBe(false);
    });
  });

  describe('isAFormGroup', () => {
    it('SHOULD return true if this is a FormGroup element', () => {
      expect(utils.isAFormGroup(<FormGroup />)).toBe(true);
    });

    it('SHOULD return false if this is NOT a FormGroup element', () => {
      expect(utils.isAFormGroup(<div />)).toBe(false);
    });
  });

  describe('getFormData', () => {
    describe('Transforms the input values from the DOM as a plain object', () => {
      let nonFormComponent;
      let dummy;
      let decoratedFormComponent;
      let mockRefs;
      let formValues;

      beforeEach(() => {
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

      beforeEach(() => {
        dummy = () => (<div>this is a custom react component</div>);
      });

      beforeEach(() => {
        decoratedFormComponent = shallow(
          <div>
            <input type="text" name="firstName" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <div>
              <input type="checkbox" name="remember" />
            </div>
            <input type="radio" name="radioItem" value="Delivery" />
            <input type="radio" name="radioItem" value="Collection" />
            <select name="country">
              <option value="None" >Please Select</option>
              <option value="GB" >United Kingdom</option>
              <option value="DE" >Germany</option>
            </select>
            <textarea name="notes" />
          </div>
        );
      });

      beforeEach(() => {
        nonFormComponent = shallow(
          <div>
            some root level string that needs to be ignored
            <dummy />
            <div id="dummy">dummy</div>
            <button>dummy button</button>
          </div>
        );
      });

      beforeEach(() => {
        formValues = utils.getFormData(decoratedFormComponent.prop('children'), mockRefs);
      });

      it('SHOULD ignore NON form elements like - strings, divs, buttons, custom components', () => {
        const values = utils.getFormData(nonFormComponent.prop('children'), null);
        expect(values).toBeEmptyObject();
      });

      it('SHOULD return values for regular inputs - text, email, password', () => {
        expect(formValues.firstName).toBe(mockRefs.firstName.value);
        expect(formValues.email).toBe(mockRefs.email.value);
        expect(formValues.password).toBe(mockRefs.password.value);
      });

      it('SHOULD return values for checkbox input', () => {
        expect(formValues.remember).toBeBoolean();
        expect(formValues.remember).toBe(mockRefs.remember.checked);
      });

      it('SHOULD return values for radio input', () => {
        expect(formValues.radioItem).toBe(mockRefs.radioItemCollection.value);
      });

      it('SHOULD return values for select list', () => {
        expect(formValues.country).toBe(mockRefs.country.value);
      });

      it('SHOULD return values for textareas', () => {
        expect(formValues.notes).toBe(mockRefs.notes.value);
      });
    });
  });

  describe('filterValidation', () => {
    const validation = {
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

    it('SHOULD return only the rules and messages matching the given inputs', () => {
      const children = (
        <div>
          <input name="firstName" />
          <input name="lastName" />
        </div>
      );
      const validationRules = utils.filterValidation({
        children,
        validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given textarea', () => {
      const children = (
        <div>
          <textarea name="firstName" type="text" />
          <textarea name="lastName" type="text" />
        </div>
      );
      const validationRules = utils.filterValidation({
        children,
        validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given select', () => {
      const children = (
        <div>
          <select name="firstName">
            <option>John</option>
          </select>
          <select name="lastName">
            <option>Smith</option>
          </select>
        </div>
      );
      const validationRules = utils.filterValidation({
        children,
        validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given radio and checkbox', () => {
      const children = (
        <div>
          <input name="firstName" type="checkbox" />
          <input name="lastName" type="radio" />
        </div>
      );
      const validationRules = utils.filterValidation({
        children,
        validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });

    it('SHOULD return only the rules and messages matching the given nested form elements', () => {
      const children = (
        <div>
          <div>
            <div>
              <div>
                <div></div>
                string text
                <input name="firstName" type="checkbox" />
                <input name="lastName" type="radio" />
              </div>
            </div>
          </div>
        </div>
      );
      const validationRules = utils.filterValidation({
        children,
        validation
      });

      expect(validationRules.rules).toHaveMember('firstName');
      expect(validationRules.messages).toHaveMember('lastName');
      expect(validationRules.rules).not.toHaveMember('nickName');
      expect(validationRules.messages).not.toHaveMember('middleName');
    });
  });

  describe('omitValidation', () => {
    let omitValidation;
    let validation;
    beforeEach(() => {
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

    it('SHOULD return rules and messages members', () => {
      expect(omitValidation).toHaveMember('rules');
      expect(omitValidation).toHaveMember('messages');
    });

    it('SHOULD return picked rules', () => {
      expect(omitValidation.rules).toHaveMember('line1');
      expect(omitValidation.rules.line1).toHaveMember('required');
    });

    it('SHOULD return picked messages', () => {
      expect(omitValidation.messages).toHaveMember('line1');
      expect(omitValidation.messages.line1).toHaveMember('required');
      expect(omitValidation.messages.line1.required)
        .toBe(validation.messages.line1.required);
    });

    it('SHOULD NOT return omitted rules', () => {
      expect(omitValidation.rules).not.toHaveMember('firstName');
      expect(omitValidation.rules).not.toHaveMember('lastName');
    });

    it('SHOULD NOT return omitted messages', () => {
      expect(omitValidation.messages).not.toHaveMember('firstName');
      expect(omitValidation.messages).not.toHaveMember('lastName');
    });
  });
});
