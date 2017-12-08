'use strict';

require('jsdom-global/register');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _enzyme = require('enzyme');

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _formConstants = require('./formConstants');

var CONST = _interopRequireWildcard(_formConstants);

var _formError = require('./formError');

var _formError2 = _interopRequireDefault(_formError);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form Container', function () {
  describe('A decorator component which clones all its children and decorates each form element\n    with event handlers, values, error messages, input refs and CSS classes.\n    See "formBuilder.js" for the actual function', function () {
    var wrapper = void 0;
    var validationObj = void 0;
    var defaultValues = {
      'gx-pin': '1234'
    };

    var getForm = function getForm(store) {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          _form2.default,
          {
            handleValidForm: function handleValidForm() {
              return true;
            },
            action: '/',
            formName: 'Giftcard',
            validation: validationObj,
            className: 'extra-class',
            defaultValues: defaultValues
          },
          'This is a string for the form which should not cause build form to break',
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { name: 'gx-number', id: 'gxNumber', type: 'text' }),
            _react2.default.createElement(_formError2.default, { forInput: 'gx-number' }),
            _react2.default.createElement('input', { name: 'gx-pin', id: 'gxPin', type: 'text' }),
            _react2.default.createElement(_formError2.default, { forInput: 'gx-pin' }),
            _react2.default.createElement(
              'div',
              { id: 'nestedDiv' },
              'nested string'
            )
          ),
          _react2.default.createElement('button', null)
        )
      );
    };

    beforeEach(function () {
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

    beforeEach(function () {
      var store = (0, _redux.createStore)(function () {
        return { Forms: {} };
      });
      wrapper = (0, _enzyme.mount)(getForm(store));
    });

    afterEach(function () {
      wrapper.unmount();
    });

    it('SHOULD render component children', function () {
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it('SHOULD render string children', function () {
      expect(wrapper.find('form').text()).toStartWith('This is a string');
    });

    it('SHOULD render nested string children', function () {
      expect(wrapper.find('#nestedDiv').text()).toStartWith('nested');
    });

    it('SHOULD render nested component children', function () {
      expect(wrapper.find('input').length).toBeGreaterThan(0);
    });

    it('SHOULD assign extra properties to the Form element', function () {
      expect(wrapper.find('form').hasClass('extra-class')).toBe(true);
    });

    describe('Event handler', function () {
      describe('On Submit', function () {
        describe('This event is triggered when the form is submitted by the user', function () {
          describe('WHEN error is present', function () {
            var errorMsg = 'error message';
            beforeEach(function () {
              var mockReducer = function mockReducer() {
                return {
                  Forms: {
                    Giftcard: {
                      errors: {
                        'gx-number': [errorMsg]
                      }
                    }
                  }
                };
              };
              var store = (0, _redux.createStore)(mockReducer, (0, _redux.applyMiddleware)(_reduxThunk2.default));
              wrapper = (0, _enzyme.mount)(getForm(store));
              wrapper.find('form').simulate('submit');
            });

            it('SHOULD add error input class', function () {
              expect(wrapper.find('#gxNumber').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
            });

            it('SHOULD show error message', function () {
              expect(wrapper.find(_formError2.default).first().prop('msg')).toBe(errorMsg);
            });

            describe('AND error is removed', function () {
              beforeEach(function () {
                var mockReducer = function mockReducer() {
                  return {
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
                  };
                };
                var store = (0, _redux.createStore)(mockReducer, (0, _redux.applyMiddleware)(_reduxThunk2.default));
                wrapper = (0, _enzyme.mount)(getForm(store));
                wrapper.find('form').simulate('submit');
              });

              it('SHOULD remove error input class', function () {
                expect(wrapper.find('#gxNumber').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(false);
              });
              it('SHOULD remove error message', function () {
                expect(wrapper.find(_formError2.default).first().prop('msg')).toBeUndefined();
              });
            });
          });
        });
      });

      describe('On Validate', function () {
        describe('This event is triggered ON BLUR', function () {
          describe('WHEN error is present', function () {
            var errorMsg = 'error message';
            beforeEach(function () {
              var mockReducer = function mockReducer() {
                return {
                  Forms: {
                    Giftcard: {
                      errors: {
                        'gx-pin': [errorMsg]
                      }
                    }
                  }
                };
              };
              var store = (0, _redux.createStore)(mockReducer, (0, _redux.applyMiddleware)(_reduxThunk2.default));

              wrapper = (0, _enzyme.mount)(getForm(store));
            });

            it('SHOULD add error input class', function () {
              expect(wrapper.find('#gxPin').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
            });

            it('SHOULD show error message', function () {
              expect(wrapper.find(_formError2.default).last().prop('msg')).toBe(errorMsg);
            });
          });
        });
      });
    });
  });
});
//# sourceMappingURL=formSpec.js.map