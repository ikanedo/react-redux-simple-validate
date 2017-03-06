import React from 'react';
import formElementFromState from 'src/forms/formElement/formElementFromState';

describe('FormValueAttr', () => {
  describe(
    `Facade function which returns the value attr (key/val) from the state.
    Please read - https://facebook.github.io/react/docs/forms.html
    The reason why we do this is to transform every form element into a controlled component`
  , () => {
    const formState = {
      firstName: 'John',
      remember: true,
      rdoExample: 'apple'
    };

    it('SHOULD return null WHEN values are empty', () => {
      const notFoundInput = <input name="notFound" type="text" />;
      const attr = formElementFromState(notFoundInput).getKeyVal();
      expect(attr).toBeNull();
    });

    it('SHOULD return null WHEN element is not found', () => {
      const notFoundInput = <input name="notFound" type="text" />;
      const attr = formElementFromState(notFoundInput, formState).getKeyVal();
      expect(attr).toBeNull();
    });

    it('SHOULD return checked attr WHEN element is a checkbox', () => {
      const checkbox = <input type="checkbox" name="remember" value="not this" />;
      const attr = formElementFromState(checkbox, formState).getKeyVal();
      expect(attr).toHaveMember('checked');
    });

    it('SHOULD return checked attribute TRUE WHEN radio element name is the value', () => {
      const radioTrue = <input type="radio" name="rdoExample" value="apple" checked />;
      const attr = formElementFromState(radioTrue, formState).getKeyVal();
      expect(attr.checked).toBe(radioTrue.props.checked);
    });

    it('SHOULD return checked attribute FALSE WHEN radio element name is NOT the value', () => {
      const radioFalse = <input type="radio" name="rdoExample" value="oranges" checked={false} />;
      const attr = formElementFromState(radioFalse, formState).getKeyVal();
      expect(attr.checked).toBe(radioFalse.props.checked);
    });

    it('SHOULD return value attr WHEN element is a regular input, select or textarea', () => {
      const foundInput = <input name="firstName" type="text" />;
      const attr = formElementFromState(foundInput, formState).getKeyVal();
      expect(attr).toHaveMember('value');
    });
  });
});
