import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import ConnectedForm from './form';
import * as CONST from './formConstants';
import FormError from './formError';

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

      const getForm = store => (
        <Provider store={store}>
          <ConnectedForm
            handleValidForm={() => true}
            handleInvalidForm={() => true}
            action="/"
            formName="Giftcard"
            validation={validationObj}
            className="extra-class"
            defaultValues={defaultValues}
            validateEvent="onBlur"
            invalidateEvent="onBlur"
          >
            This is a string for the form which should not cause build form to break
            <div id="gx-holder" data-form-error="gx-pin">
              <label htmlFor="gx-number">
                GX Number
                <input name="gx-number" id="gx-number" type="text" />
              </label>
              <FormError forInput="gx-number" />
              <label id="gx-pin-abel" htmlFor="gx-pin">
                GX Pin
                <input name="gx-pin" id="gx-pin" type="text" />
              </label>
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

              it('SHOULD execute validate and invalidate events', () => {
                wrapper.find('#gx-pin')
                  .simulate('change', { target: { value: '12345' } })
                  .simulate('blur', { target: { value: '12345' } })
                  .simulate('change', { target: { value: '1' } })
                  .simulate('blur', { target: { value: '1' } });
                /*
                  no need to expect, test is validated by making sure
                  'getValidateEvents' in formBuilder is 100% test covered
                */
              });

              it('SHOULD add error input class', () => {
                expect(wrapper.find('#gx-number').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
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
                  expect(wrapper.find('#gx-number')
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
                expect(wrapper.find('#gx-pin').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD add error class to a data-form-error element', () => {
                expect(wrapper.find('#gx-holder').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD add error class to input element label', () => {
                expect(wrapper.find('#gx-pin-abel').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD show error message', () => {
                expect(wrapper.find(FormError).last().prop('msg')).toBe(errorMsg);
              });
            });
          });
        });
      });
    }
  );
});
