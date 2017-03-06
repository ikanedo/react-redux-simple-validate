import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import ConnectedForm from 'src/forms/form';
import * as CONST from 'src/forms/formConstants';
import FormError from 'src/forms/formError';

describe('Form Container', () => {
  describe(
    `A decorator component which clones all its children and decorates each form element
    with event handlers, values, error messages, input refs and CSS classes.
    See "formBuilder.js" for the actual function`
  , () => {
    let wrapper;
    let validationObj;
    const defaultValues = {
      'gx-pin': '1234'
    };

    const getForm = (store) => (
      <Provider store={store}>
        <ConnectedForm
          handleValidForm={() => true}
          action="/"
          formName="Giftcard"
          validation={validationObj}
          className="extra-class"
          defaultValues={defaultValues}
        >
          This is a string for the form which should not cause build form to break
          <div>
            <input name="gx-number" id="gxNumber" type="text" />
            <FormError forInput="gx-number" />
            <input name="gx-pin" id="gxPin" type="text" />
            <FormError forInput="gx-pin" />
            <div id="nestedDiv">nested string</div>
          </div>
          <button />
        </ConnectedForm>
      </Provider>
    );

    beforeEach(() => {
      validationObj = {
        rules: {
          'gx-number': {
            required: true
          },
          'gx-pin': {
            required: true,
            minlength: 4
          }
        },
        messages: {
          'gx-number': {
            required: 'Please enter a valid giftcard number'
          },
          'gx-pin': {
            required: 'Please enter a valid giftcard pin',
            minlength: 'It has to be 4 characters long'
          }
        }
      };
    });

    beforeEach(() => {
      const store = createStore(() => ({ Forms: {} }));
      wrapper = mount(getForm(store));
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('SHOULD render component children', () => {
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it('SHOULD render string children', () => {
      expect(wrapper.find('form').text()).toStartWith('This is a string');
    });

    it('SHOULD render nested string children', () => {
      expect(wrapper.find('#nestedDiv').text()).toStartWith('nested');
    });

    it('SHOULD render nested component children', () => {
      expect(wrapper.find('input').length).toBeGreaterThan(0);
    });

    it('SHOULD assign extra properties to the Form element', () => {
      expect(wrapper.find('form').hasClass('extra-class')).toBe(true);
    });

    describe('Event handler', () => {
      describe('On Submit', () => {
        describe('This event is triggered when the form is submitted by the user', () => {
          describe('WHEN error is present', () => {
            const errorMsg = 'error message';
            beforeEach(() => {
              const mockReducer = () => ({
                Forms: {
                  Giftcard: {
                    errors: {
                      'gx-number': [errorMsg]
                    }
                  }
                }
              });
              const store = createStore(mockReducer, applyMiddleware(thunk));
              wrapper = mount(getForm(store));
              wrapper.find('form').simulate('submit');
            });

            it('SHOULD add error input class', () => {
              expect(wrapper.find('#gxNumber').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
            });

            it('SHOULD show error message', () => {
              expect(wrapper.find(FormError).first().prop('msg')).toBe(errorMsg);
            });

            describe('AND error is removed', () => {
              beforeEach(() => {
                const mockReducer = () => ({
                  Forms: {
                    Giftcard: {
                      values: {
                        'gx-number': 'some value',
                        'gx-pin': '1234'
                      },
                      errors: {
                        'gx-number': ''
                      }
                    }
                  }
                });
                const store = createStore(mockReducer, applyMiddleware(thunk));
                wrapper = mount(getForm(store));
                wrapper.find('form').simulate('submit');
              });

              it('SHOULD remove error input class', () => {
                expect(wrapper.find('#gxNumber')
                  .hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(false);
              });
              it('SHOULD remove error message', () => {
                expect(wrapper.find(FormError).first().prop('msg')).toBeUndefined();
              });
            });
          });
        });
      });

      describe('On Validate', () => {
        describe('This event is triggered ON BLUR', () => {
          describe('WHEN error is present', () => {
            const errorMsg = 'error message';
            beforeEach(() => {
              const mockReducer = () => ({
                Forms: {
                  Giftcard: {
                    errors: {
                      'gx-pin': [errorMsg]
                    }
                  }
                }
              });
              const store = createStore(mockReducer, applyMiddleware(thunk));

              wrapper = mount(getForm(store));
            });

            it('SHOULD add error input class', () => {
              expect(wrapper.find('#gxPin').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
            });

            it('SHOULD show error message', () => {
              expect(wrapper.find(FormError).last().prop('msg')).toBe(errorMsg);
            });

            describe('WHEN value is changed', () => {
              beforeEach(() => {
                const mockReducer = () => ({
                  Forms: {
                    Giftcard: {}
                  }
                });

                const store = createStore(mockReducer, applyMiddleware(thunk));
                wrapper = mount(getForm(store));
              });

              it('SHOULD trigger validation', () => {
                // smoke test no expect needed
                wrapper.find('#gxPin').node.value = 'asfas';
                ReactTestUtils.Simulate.change(wrapper.find('#gxPin').node);
                ReactTestUtils.Simulate.blur(wrapper.find('#gxPin').node);
              });
            });
          });
        });
      });
    });
  });
});
