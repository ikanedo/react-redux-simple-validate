import formElementFromEvt from './formElementFromEvt';

describe('FormElementFromEvt', () => {
  describe('Use this to get the value from the event object', () => {
    it('SHOULD call FormElementFromEvt instance', () => {
      const inputValue = formElementFromEvt({
        target: 'dummy'
      });
      expect(inputValue.constructor.name).toBe('FormElementFromEvt');
    });

    it('SHOULD return the value of a text field', () => {
      const inputValue = formElementFromEvt({
        target: {
          value: 'Text'
        },
      }).getVal();
      expect(inputValue).toBe('Text');
    });


    it('SHOULD return an empty string if the value is undefined', () => {
      const inputValue = formElementFromEvt({
        target: {},
      }).getVal();
      expect(inputValue).toBe('');
    });

    it('SHOULD return a boolean value for checkboxes', () => {
      const inputValue = formElementFromEvt({
        target: {
          type: 'checkbox',
          checked: false,
          value: 'not this'
        },
      }).getVal();
      expect(inputValue).toBeBoolean();
      expect(inputValue).not.toBe('not this');
    });
  });
});
