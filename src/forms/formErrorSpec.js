import React from 'react';
import { shallow } from 'enzyme';
import { ERROR_MSG_CLASS_NAME } from 'src/forms/formConstants';
import FormError from 'src/forms/formError';

describe('Form Error', () => {
  it('should render error className', () => {
    const wrapper = shallow(<FormError forInput="dummyName" />);
    expect(wrapper.hasClass(`${ERROR_MSG_CLASS_NAME}--dummyName`)).toBe(true);
  });

  it('should render error message', () => {
    const errorMsg = 'error message dummy';
    const wrapper = shallow(<FormError forInput="dummyName" msg={errorMsg} />);
    expect(wrapper.contains(errorMsg)).toBe(true);
  });
});
