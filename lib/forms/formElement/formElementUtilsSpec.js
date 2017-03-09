'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _formElementUtils = require('./formElementUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FormElementUtils', function () {
  describe('getFormInputType', function () {
    describe('Returns the input type, tested elements include text, number, email, password\n        number, checkbox, radio. Other input elements like hidden, date, week etc. are not tested.\n      ', function () {
      var getInputElement = function getInputElement(type) {
        return _react2.default.createElement('input', { type: type });
      };

      it('SHOULD return default for unknown types (text, number, email, etc.)', function () {
        var text = (0, _enzyme.shallow)(getInputElement('text')).prop('type');
        var email = (0, _enzyme.shallow)(getInputElement('email')).prop('type');
        var password = (0, _enzyme.shallow)(getInputElement('password')).prop('type');
        var number = (0, _enzyme.shallow)(getInputElement('number')).prop('type');
        expect((0, _formElementUtils.getFormInputType)(text)).toBe('default');
        expect((0, _formElementUtils.getFormInputType)(email)).toBe('default');
        expect((0, _formElementUtils.getFormInputType)(password)).toBe('default');
        expect((0, _formElementUtils.getFormInputType)(number)).toBe('default');
      });

      it('SHOULD return checkbox if the input type is checkbox', function () {
        var checkbox = (0, _enzyme.shallow)(getInputElement('checkbox')).prop('type');
        expect((0, _formElementUtils.getFormInputType)(checkbox)).toBe('checkbox');
      });

      it('SHOULD return radio if the input type is radio', function () {
        var radio = (0, _enzyme.shallow)(getInputElement('radio')).prop('type');
        expect((0, _formElementUtils.getFormInputType)(radio)).toBe('radio');
      });
    });
  });

  describe('getFormElementType', function () {
    describe('Returns the React element type and filters form elements like select, textarea and input.\n      Other possible form element types are not considered until use case arises.\n      ', function () {
      it('SHOULD return select for select elements', function () {
        expect((0, _formElementUtils.getFormElementType)(_react2.default.createElement('select', null))).toBe('select');
      });

      it('SHOULD return default for textarea', function () {
        expect((0, _formElementUtils.getFormElementType)(_react2.default.createElement('textarea', null))).toBe('default');
      });

      it('SHOULD return default for regular input elements', function () {
        expect((0, _formElementUtils.getFormElementType)(_react2.default.createElement('input', null))).toBe('default');
      });

      it('SHOULD return radio for radio input elements', function () {
        expect((0, _formElementUtils.getFormElementType)(_react2.default.createElement('input', { type: 'radio' }))).toBe('radio');
      });

      it('SHOULD return checkbox for checkbox input elements', function () {
        expect((0, _formElementUtils.getFormElementType)(_react2.default.createElement('input', { type: 'checkbox' }))).toBe('checkbox');
      });
    });
  });

  describe('getFormElementRefName', function () {
    describe('Returns the ref name for form elements. Radio ref name is returned as (name + value)\n      WHY? since radio buttons have 1 name with multiple values, we need to identify which\n      value belongs to which name. This is not an issue with other form elements.\n      ', function () {
      it('SHOULD return the correct name for Radio', function () {
        expect((0, _formElementUtils.getFormElementRefName)(_react2.default.createElement('input', { type: 'radio', name: 'myName', value: 'myVal' }))).toBe('myNamemyVal');
      });

      it('\n        SHOULD return the correct name for Other form elements.\n        Assumption: each form element name is unique\n        ', function () {
        expect((0, _formElementUtils.getFormElementRefName)(_react2.default.createElement('select', { name: 'mySelect' }))).toBe('mySelect');
      });
    });
  });
});
//# sourceMappingURL=formElementUtilsSpec.js.map