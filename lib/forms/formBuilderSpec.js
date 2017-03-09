'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _formBuilder = require('./formBuilder');

var _formBuilder2 = _interopRequireDefault(_formBuilder);

var _formError = require('./formError');

var _formError2 = _interopRequireDefault(_formError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('formBuilder', function () {
  describe('Iterates through each child and decorates all form elements\n    with the given callback handlers, error message, values etc.', function () {
    var wrapper = void 0;
    var spyObj = void 0;
    var formStateMock = void 0;
    var clonedComp = void 0;
    var clonedCompRendered = void 0;

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
      spyOn(spyObj, 'onValidateMock');
      spyOn(spyObj, 'onChangeMock');
      spyOn(spyObj, 'onChangeFromJsx');
      spyOn(spyObj, 'onBlurFromJsx');
      spyOn(spyObj, 'onClickFromJsx');
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
          _react2.default.createElement('input', { type: 'text', name: 'firstName', id: 'firstName',
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
      clonedComp = (0, _formBuilder2.default)({
        children: wrapper.prop('children'),
        errors: formStateMock.errors,
        values: formStateMock.values,
        onValidate: spyObj.onValidateMock,
        onValueChange: spyObj.onChangeMock
      });
      clonedCompRendered = (0, _enzyme.shallow)(_react2.default.createElement(
        'div',
        null,
        clonedComp
      ));
    });

    beforeEach(function () {
      clonedCompRendered.find('#firstName').simulate('change', {
        target: {
          value: 'change value'
        }
      });
      clonedCompRendered.find('#firstName').simulate('blur');
    });

    it('SHOULD throw an error if a form element has no name', function () {
      var builder = _formBuilder2.default.bind(null, {
        children: _react2.default.createElement('input', { type: 'text' }),
        errors: formStateMock.errors,
        values: formStateMock.values,
        onValidate: spyObj.onValidateMock,
        onValueChange: spyObj.onChangeMock
      });
      expect(builder).toThrowError();
    });

    it('SHOULD clone nested elements', function () {
      expect(clonedCompRendered.find('h2').length).toBe(1);
      expect(clonedCompRendered.find('#firstName').length).toBe(1);
      expect(clonedCompRendered.find('#remember').length).toBe(1);
    });

    it('SHOULD attach error messages', function () {
      expect(clonedCompRendered.find(_formError2.default).prop('msg')).toBe(formStateMock.errors.firstName[0]);
    });

    it('SHOULD attach callback handlers', function () {
      expect(spyObj.onValidateMock).toHaveBeenCalled();
      expect(spyObj.onChangeMock).toHaveBeenCalled();
    });

    it('SHOULD merge existing onChange and onBlur handlers that are passed via JSX', function () {
      expect(spyObj.onChangeFromJsx).toHaveBeenCalled();
      expect(spyObj.onBlurFromJsx).toHaveBeenCalled();
    });

    it('SHOULD merge existing form element props that are passed via JSX', function () {
      clonedCompRendered.find('#firstName').simulate('click');
      expect(spyObj.onClickFromJsx).toHaveBeenCalled();
    });
  });
});
//# sourceMappingURL=formBuilderSpec.js.map