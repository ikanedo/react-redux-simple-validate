import React from 'react';
import formElementFromReact from './formElementFromReact';

describe('FormElementFromReact', () => {
  describe('Use this to get the value from the React object', () => {
    describe('WHEN input type is text, number, password, email', () => {
      function mockInputAndRef(type, name, val = 'val') {
        return {
          input: <input type={type} name={name} />,
          refs: {
            [name]: {
              value: val
            }
          }
        };
      }

      it('SHOULD return null for unknown elements', () => {
        const inputValue = formElementFromReact({
          type: 'button'
        }, null).getKeyVal();
        expect(inputValue).toBeNull();
      });

      it('SHOULD return undefined for untouched form elements', () => {
        const name = 'undefinedEl';
        const inputValue = formElementFromReact(<input type="text" name={name} />, {}).getKeyVal();
        expect(inputValue.name).toBeUndefined();
      });

      it('SHOULD return the value for text input elements', () => {
        const INPUT = 'text-member';
        const mock = mockInputAndRef('text', INPUT);
        const inputValue = formElementFromReact(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });

      it('SHOULD return the value for password input elements', () => {
        const INPUT = 'password-member';
        const mock = mockInputAndRef('password', INPUT);
        const inputValue = formElementFromReact(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });

      it('SHOULD return the value for email input elements', () => {
        const INPUT = 'email-member';
        const mock = mockInputAndRef('email', INPUT);
        const inputValue = formElementFromReact(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });

      it('SHOULD return the value for number input elements', () => {
        const INPUT = 'number-member';
        const mock = mockInputAndRef('number', INPUT, 123);
        const inputValue = formElementFromReact(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });
    });

    it('SHOULD return the value for textarea elements', () => {
      const INPUT = 'textarea-member';
      const textarea = {
        type: 'textarea',
        props: {
          type: 'textarea',
          name: INPUT
        }
      };
      const refs = {
        [INPUT]: {
          value: 'dummy text data'
        }
      };
      const inputValue = formElementFromReact(textarea, refs).getKeyVal();
      expect(inputValue[INPUT]).toBe('dummy text data');
    });

    it('SHOULD return the value for select elements', () => {
      const INPUT = 'select-member';
      const select = <select name={INPUT} />;
      const refs = {
        [INPUT]: {
          value: 'GB'
        }
      };
      const inputValue = formElementFromReact(select, refs).getKeyVal();
      expect(inputValue[INPUT]).toBe('GB');
    });

    it('SHOULD return a boolean value for checkbox inputs', () => {
      const CHKBOX_NAME = 'sameAsDelivery';
      const checkbox = <input name={CHKBOX_NAME} type="checkbox" />;
      const refs = {
        [CHKBOX_NAME]: {
          value: 'not this',
          checked: true
        }
      };
      const inputValue = formElementFromReact(checkbox, refs).getKeyVal();
      expect(inputValue).toBeNonEmptyObject();
    });

    it('SHOULD return value for selected radio inputs', () => {
      const RADIO_NAME = 'radio1';
      const radio = <input name={RADIO_NAME} type="radio" value="GB" />;
      const refs = {
        [`${RADIO_NAME}GB`]: {
          value: 'GB',
          checked: true
        }
      };
      const inputValue = formElementFromReact(radio, refs).getKeyVal();
      expect(inputValue[RADIO_NAME]).toBe('GB');
    });

    it('SHOULD NOT return value for unselected radio inputs', () => {
      const RADIO_NAME = 'radio1';
      const radio = <input name={RADIO_NAME} type="radio" value="GB" />;
      const refs = {
        [`${RADIO_NAME}GB`]: {
          value: 'GB',
          checked: false
        }
      };
      const inputValue = formElementFromReact(radio, refs).getKeyVal();
      expect(inputValue).toBeNull();
    });
  });
});
