import React from 'react';
import { shallow } from 'enzyme';
import formBuilder from 'src/forms/formBuilder';
import FormError from 'src/forms/formError';

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
        onChangeMock: () => true,
        onChangeFromJsx: () => true,
        onBlurFromJsx: () => true,
        onClickFromJsx: () => true
      };
      spyOn(spyObj, 'onValidateMock');
      spyOn(spyObj, 'onChangeMock');
      spyOn(spyObj, 'onChangeFromJsx');
      spyOn(spyObj, 'onBlurFromJsx');
      spyOn(spyObj, 'onClickFromJsx');
    });

    beforeEach(() => {
      wrapper = shallow(
        <div>
          <h2>title here <span className="icon-empty"></span> </h2>
          <div>
            some string goes here
            <input type="text" name="firstName" id="firstName"
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
        onValidate: spyObj.onValidateMock,
        onValueChange: spyObj.onChangeMock
      });
      clonedCompRendered = shallow(
        <div>{ clonedComp }</div>
      );
    });

    beforeEach(() => {
      clonedCompRendered.find('#firstName').simulate('change', {
        target: {
          value: 'change value'
        }
      });
      clonedCompRendered.find('#firstName').simulate('blur');
    });

    it('SHOULD throw an error if a form element has no name', () => {
      const builder = formBuilder.bind(null, {
        children: <input type="text" />,
        errors: formStateMock.errors,
        values: formStateMock.values,
        onValidate: spyObj.onValidateMock,
        onValueChange: spyObj.onChangeMock
      });
      expect(builder).toThrowError();
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

    it('SHOULD attach callback handlers', () => {
      expect(spyObj.onValidateMock).toHaveBeenCalled();
      expect(spyObj.onChangeMock).toHaveBeenCalled();
    });

    it('SHOULD merge existing onChange and onBlur handlers that are passed via JSX', () => {
      expect(spyObj.onChangeFromJsx).toHaveBeenCalled();
      expect(spyObj.onBlurFromJsx).toHaveBeenCalled();
    });

    it('SHOULD merge existing form element props that are passed via JSX', () => {
      clonedCompRendered.find('#firstName').simulate('click');
      expect(spyObj.onClickFromJsx).toHaveBeenCalled();
    });
  });
});
