import React from 'react';
import { shallow } from 'enzyme';
import formBuilder from './formBuilder';
import FormError from './formError';

describe('formBuilder', () => {
  describe(
    `Iterates through each child and decorates all form elements
    with the given callback handlers, error message, values etc.`
  , () => {
    let wrapper;
    let spyObj;
    let formStateMock;
    let clonedComp;
    let clonedCompRendered;
    const validationEvents = {
      invalidateEvent: 'onBlur',
      validateEvent: 'onChange'
    };

    beforeEach(() => {
      formStateMock = {
        errors: {
          firstName: ['error text']
        },
        values: {
          firstName: 'John'
        }
      };
    });

    beforeEach(() => {
      spyObj = {
        onValidateMock: () => true,
        onInvalidateMock: () => true,
        onFocusMock: () => true,
        onBlurMock: () => true,
        onFocusFromJsx: () => true,
        onChangeMock: () => true,
        onChangeFromJsx: () => true,
        onBlurFromJsx: () => true,
        onClickFromJsx: () => true
      };
      spyOn(spyObj, 'onInvalidateMock');
      spyOn(spyObj, 'onValidateMock');
      spyOn(spyObj, 'onChangeMock');
      spyOn(spyObj, 'onFocusMock');
      spyOn(spyObj, 'onBlurMock');
      spyOn(spyObj, 'onChangeFromJsx');
      spyOn(spyObj, 'onBlurFromJsx');
      spyOn(spyObj, 'onClickFromJsx');
      spyOn(spyObj, 'onFocusFromJsx');
    });

    beforeEach(() => {
      wrapper = shallow(
        <div>
          <h2>title here <span className="icon-empty"></span> </h2>
          <div>
            some string goes here
            <input type="text" name="firstName" id="firstName"
              onFocus={spyObj.onFocusFromJsx}
              onChange={spyObj.onChangeFromJsx}
              onBlur={spyObj.onBlurFromJsx}
              onClick={spyObj.onClickFromJsx}
            />
            <FormError forInput="firstName" />
            <div>
              <input type="checkbox" name="remember" id="remember" />
              <input type="radio" name="radio1" id="radioOption1" />
              <input type="radio" name="radio1" id="radioOption2" />
            </div>
          </div>
        </div>
      );
    });

    beforeEach(() => {
      clonedComp = formBuilder({
        children: wrapper.prop('children'),
        errors: formStateMock.errors,
        values: formStateMock.values,
        onFocus: spyObj.onFocusMock,
        onBlur: spyObj.onBlurMock,
        onValidate: spyObj.onValidateMock,
        onInvalidate: spyObj.onInvalidateMock,
        onValueChange: spyObj.onChangeMock,
        ...validationEvents
      });
      clonedCompRendered = shallow(
        <div>{ clonedComp }</div>
      );
    });

    it('SHOULD clone nested elements', () => {
      expect(clonedCompRendered.find('h2').length).toBe(1);
      expect(clonedCompRendered.find('#firstName').length).toBe(1);
      expect(clonedCompRendered.find('#remember').length).toBe(1);
    });

    it('SHOULD attach error messages', () => {
      expect(clonedCompRendered.find(FormError).prop('msg'))
        .toBe(formStateMock.errors.firstName[0]);
    });

    it('SHOULD merge existing onClick props that are passed via JSX', () => {
      clonedCompRendered.find('#firstName').simulate('click');
      expect(spyObj.onClickFromJsx).toHaveBeenCalled();
    });

    it('SHOULD merge existing onFocus props that are passed via JSX', () => {
      clonedCompRendered.find('#firstName').simulate('focus');
      expect(spyObj.onFocusFromJsx).toHaveBeenCalled();
    });

    it('SHOULD throw an error if a form element has no name', () => {
      const builder = formBuilder.bind(null, {
        children: <input type="text" />,
        errors: formStateMock.errors,
        values: formStateMock.values,
        onValidate: spyObj.onValidateMock,
        onInvalidate: spyObj.onInvalidateMock,
        onValueChange: spyObj.onChangeMock,
        ...validationEvents
      });
      expect(builder).toThrowError();
    });

    describe('WHEN form needs to do nothing because value has not changed', () => {
      beforeEach(() => {
        clonedCompRendered.find('#firstName').simulate('focus', {
          target: {
            value: ''
          }
        });
      });

      beforeEach(() => {
        clonedCompRendered.find('#firstName').simulate('blur', {
          target: {
            value: ''
          }
        });
      });

      it('SHOULD NOT attach callback handlers', () => {
        expect(spyObj.onInvalidateMock).not.toHaveBeenCalled();
        expect(spyObj.onValidateMock).not.toHaveBeenCalled();
        expect(spyObj.onChangeMock).not.toHaveBeenCalled();
      });

      it('SHOULD NOT merge existing onBlur handlers that are passed via JSX', () => {
        expect(spyObj.onChangeFromJsx).not.toHaveBeenCalled();
        expect(spyObj.onBlurFromJsx).not.toHaveBeenCalled();
      });
    });

    describe('WHEN form needs to call invalidate', () => {
      beforeEach(() => {
        clonedCompRendered.find('#firstName').simulate('focus', {
          target: {
            value: ''
          }
        });
      });

      beforeEach(() => {
        clonedCompRendered.find('#firstName').simulate('blur', {
          target: {
            value: 'change value'
          }
        });
      });

      it('SHOULD call onValidate callback ONLY', () => {
        expect(spyObj.onInvalidateMock).toHaveBeenCalled();
        expect(spyObj.onValidateMock).not.toHaveBeenCalled();
        expect(spyObj.onChangeMock).not.toHaveBeenCalled();
      });

      it('SHOULD merge existing onBlur handlers that are passed via JSX', () => {
        expect(spyObj.onChangeFromJsx).not.toHaveBeenCalled();
        expect(spyObj.onBlurFromJsx).toHaveBeenCalled();
      });
    });

    describe('WHEN form needs to call validate', () => {
      beforeEach(() => {
        clonedCompRendered.find('#firstName').simulate('change', {
          target: {
            value: 'change value'
          }
        });
      });

      it('SHOULD call onInvalidate and onChange callbacks ONLY', () => {
        expect(spyObj.onInvalidateMock).not.toHaveBeenCalled();
        expect(spyObj.onValidateMock).toHaveBeenCalled();
        expect(spyObj.onChangeMock).toHaveBeenCalled();
      });

      it('SHOULD merge existing onChange handlers that are passed via JSX', () => {
        expect(spyObj.onChangeFromJsx).toHaveBeenCalled();
        expect(spyObj.onBlurFromJsx).not.toHaveBeenCalled();
      });
    });
  });
});

