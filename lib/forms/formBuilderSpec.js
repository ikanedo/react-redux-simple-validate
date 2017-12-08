'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _formBuilder = require('./formBuilder');

var _formBuilder2 = _interopRequireDefault(_formBuilder);

var _formError = require('./formError');

var _formError2 = _interopRequireDefault(_formError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('formBuilder', function () {
  describe('Iterates through each child and decorates all form elements with the given props', function () {
    var wrapper = void 0;
    var spyObj = void 0;
    var formStateMock = void 0;
    var clonedComp = void 0;
    var clonedCompRendered = void 0;
    var validationEvents = {
      invalidateEvent: 'onBlur',
      validateEvent: 'onChange'
    };

    beforeEach(function () {
      formStateMock = {
        errors: {
          firstName: ['error text']
        },
        values: {
          firstName: 'John'
        }
      };
    });

    beforeEach(function () {
      spyObj = {
        onValidateMock: function onValidateMock() {
          return true;
        },
        onInvalidateMock: function onInvalidateMock() {
          return true;
        },
        onFocusMock: function onFocusMock() {
          return true;
        },
        onBlurMock: function onBlurMock() {
          return true;
        },
        onFocusFromJsx: function onFocusFromJsx() {
          return true;
        },
        onChangeMock: function onChangeMock() {
          return true;
        },
        onChangeFromJsx: function onChangeFromJsx() {
          return true;
        },
        onBlurFromJsx: function onBlurFromJsx() {
          return true;
        },
        onClickFromJsx: function onClickFromJsx() {
          return true;
        }
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

    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'title here ',
          _react2.default.createElement('span', { className: 'icon-empty' }),
          ' '
        ),
        _react2.default.createElement(
          'div',
          null,
          'some string goes here',
          _react2.default.createElement('input', {
            type: 'text',
            name: 'firstName',
            id: 'firstName',
            onFocus: spyObj.onFocusFromJsx,
            onChange: spyObj.onChangeFromJsx,
            onBlur: spyObj.onBlurFromJsx,
            onClick: spyObj.onClickFromJsx
          }),
          _react2.default.createElement(_formError2.default, { forInput: 'firstName' }),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { type: 'checkbox', name: 'remember', id: 'remember' }),
            _react2.default.createElement('input', { type: 'radio', name: 'radio1', id: 'radioOption1' }),
            _react2.default.createElement('input', { type: 'radio', name: 'radio1', id: 'radioOption2' })
          )
        )
      ));
    });

    beforeEach(function () {
      clonedComp = (0, _formBuilder2.default)(_extends({
        children: wrapper.prop('children'),
        errors: formStateMock.errors,
        values: formStateMock.values,
        onFocus: spyObj.onFocusMock,
        onBlur: spyObj.onBlurMock,
        onValidate: spyObj.onValidateMock,
        onInvalidate: spyObj.onInvalidateMock,
        onValueChange: spyObj.onChangeMock
      }, validationEvents));
      clonedCompRendered = (0, _enzyme.shallow)(_react2.default.createElement(
        'div',
        null,
        clonedComp
      ));
    });

    it('SHOULD clone nested elements', function () {
      expect(clonedCompRendered.find('h2').length).toBe(1);
      expect(clonedCompRendered.find('#firstName').length).toBe(1);
      expect(clonedCompRendered.find('#remember').length).toBe(1);
    });

    it('SHOULD attach error messages', function () {
      expect(clonedCompRendered.find(_formError2.default).prop('msg')).toBe(formStateMock.errors.firstName[0]);
    });

    it('SHOULD merge existing onClick props that are passed via JSX', function () {
      clonedCompRendered.find('#firstName').simulate('click');
      expect(spyObj.onClickFromJsx).toHaveBeenCalled();
    });

    it('SHOULD merge existing onFocus props that are passed via JSX', function () {
      clonedCompRendered.find('#firstName').simulate('focus');
      expect(spyObj.onFocusFromJsx).toHaveBeenCalled();
    });

    it('SHOULD throw an error if a form element has no name', function () {
      var builder = _formBuilder2.default.bind(null, _extends({
        children: _react2.default.createElement('input', { type: 'text' }),
        errors: formStateMock.errors,
        values: formStateMock.values,
        onValidate: spyObj.onValidateMock,
        onInvalidate: spyObj.onInvalidateMock,
        onValueChange: spyObj.onChangeMock
      }, validationEvents));
      expect(builder).toThrowError();
    });

    describe('WHEN form needs to do nothing because value has not changed', function () {
      beforeEach(function () {
        clonedCompRendered.find('#firstName').simulate('focus', {
          target: {
            value: ''
          }
        });
      });

      beforeEach(function () {
        clonedCompRendered.find('#firstName').simulate('blur', {
          target: {
            value: ''
          }
        });
      });

      it('SHOULD NOT attach callback handlers', function () {
        expect(spyObj.onInvalidateMock).not.toHaveBeenCalled();
        expect(spyObj.onValidateMock).not.toHaveBeenCalled();
        expect(spyObj.onChangeMock).not.toHaveBeenCalled();
      });

      it('SHOULD NOT merge existing onBlur handlers that are passed via JSX', function () {
        expect(spyObj.onChangeFromJsx).not.toHaveBeenCalled();
        expect(spyObj.onBlurFromJsx).not.toHaveBeenCalled();
      });
    });

    describe('WHEN form needs to call invalidate', function () {
      beforeEach(function () {
        clonedCompRendered.find('#firstName').simulate('focus', {
          target: {
            value: ''
          }
        });
      });

      beforeEach(function () {
        clonedCompRendered.find('#firstName').simulate('blur', {
          target: {
            value: 'change value'
          }
        });
      });

      it('SHOULD call onValidate callback ONLY', function () {
        expect(spyObj.onInvalidateMock).toHaveBeenCalled();
        expect(spyObj.onValidateMock).not.toHaveBeenCalled();
        expect(spyObj.onChangeMock).not.toHaveBeenCalled();
      });

      it('SHOULD merge existing onBlur handlers that are passed via JSX', function () {
        expect(spyObj.onChangeFromJsx).not.toHaveBeenCalled();
        expect(spyObj.onBlurFromJsx).toHaveBeenCalled();
      });
    });

    describe('WHEN form needs to call validate', function () {
      beforeEach(function () {
        clonedCompRendered.find('#firstName').simulate('change', {
          target: {
            value: 'change value'
          }
        });
      });

      it('SHOULD call onInvalidate and onChange callbacks ONLY', function () {
        expect(spyObj.onInvalidateMock).not.toHaveBeenCalled();
        expect(spyObj.onValidateMock).toHaveBeenCalled();
        expect(spyObj.onChangeMock).toHaveBeenCalled();
      });

      it('SHOULD merge existing onChange handlers that are passed via JSX', function () {
        expect(spyObj.onChangeFromJsx).toHaveBeenCalled();
        expect(spyObj.onBlurFromJsx).not.toHaveBeenCalled();
      });
    });
  });
});
//# sourceMappingURL=formBuilderSpec.js.map