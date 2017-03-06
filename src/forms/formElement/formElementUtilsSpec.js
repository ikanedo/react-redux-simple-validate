import React from 'react';
import { shallow } from 'enzyme';
import {
  getFormInputType,
  getFormElementType,
  getFormElementRefName
} from 'src/forms/formElement/formElementUtils';

describe('FormElementUtils', () => {
  describe('getFormInputType', () => {
    describe(
      `Returns the input type, tested elements include text, number, email, password
        number, checkbox, radio. Other input elements like hidden, date, week etc. are not tested.
      `, () => {
      const getInputElement = (type) => <input type={type} />;

      it('SHOULD return default for unknown types (text, number, email, etc.)', () => {
        const text = shallow(getInputElement('text')).prop('type');
        const email = shallow(getInputElement('email')).prop('type');
        const password = shallow(getInputElement('password')).prop('type');
        const number = shallow(getInputElement('number')).prop('type');
        expect(getFormInputType(text)).toBe('default');
        expect(getFormInputType(email)).toBe('default');
        expect(getFormInputType(password)).toBe('default');
        expect(getFormInputType(number)).toBe('default');
      });

      it('SHOULD return checkbox if the input type is checkbox', () => {
        const checkbox = shallow(getInputElement('checkbox')).prop('type');
        expect(getFormInputType(checkbox)).toBe('checkbox');
      });

      it('SHOULD return radio if the input type is radio', () => {
        const radio = shallow(getInputElement('radio')).prop('type');
        expect(getFormInputType(radio)).toBe('radio');
      });
    });
  });

  describe('getFormElementType', () => {
    describe(
      `Returns the React element type and filters form elements like select, textarea and input.
      Other possible form element types are not considered until use case arises.
      `, () => {
      it('SHOULD return select for select elements', () => {
        expect(getFormElementType(<select />)).toBe('select');
      });

      it('SHOULD return default for textarea', () => {
        expect(getFormElementType(<textarea />)).toBe('default');
      });

      it('SHOULD return default for regular input elements', () => {
        expect(getFormElementType(<input />)).toBe('default');
      });

      it('SHOULD return radio for radio input elements', () => {
        expect(getFormElementType(<input type="radio" />)).toBe('radio');
      });

      it('SHOULD return checkbox for checkbox input elements', () => {
        expect(getFormElementType(<input type="checkbox" />)).toBe('checkbox');
      });
    });
  });

  describe('getFormElementRefName', () => {
    describe(
      `Returns the ref name for form elements. Radio ref name is returned as (name + value)
      WHY? since radio buttons have 1 name with multiple values, we need to identify which
      value belongs to which name. This is not an issue with other form elements.
      `, () => {
      it('SHOULD return the correct name for Radio', () => {
        expect(getFormElementRefName(
          <input type="radio" name="myName" value="myVal" />
        )).toBe('myNamemyVal');
      });

      it(`
        SHOULD return the correct name for Other form elements.
        Assumption: each form element name is unique
        `, () => {
        expect(getFormElementRefName(<select name="mySelect" />)).toBe('mySelect');
      });
    });
  });
});
