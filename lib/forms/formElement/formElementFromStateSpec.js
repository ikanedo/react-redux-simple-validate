'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formElementFromState = require('./formElementFromState');

var _formElementFromState2 = _interopRequireDefault(_formElementFromState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FormValueAttr', function () {
  describe('Facade function which returns the value attr (key/val) from the state.\n    Please read - https://facebook.github.io/react/docs/forms.html\n    The reason why we do this is to transform every form element into a controlled component', function () {
    var formState = {
      firstName: 'John',
      remember: true,
      rdoExample: 'apple'
    };

    it('SHOULD return null WHEN values are empty', function () {
      var notFoundInput = _react2.default.createElement('input', { name: 'notFound', type: 'text' });
      var attr = (0, _formElementFromState2.default)(notFoundInput).getKeyVal();
      expect(attr).toBeNull();
    });

    it('SHOULD return null WHEN element is not found', function () {
      var notFoundInput = _react2.default.createElement('input', { name: 'notFound', type: 'text' });
      var attr = (0, _formElementFromState2.default)(notFoundInput, formState).getKeyVal();
      expect(attr).toBeNull();
    });

    it('SHOULD return checked attr WHEN element is a checkbox', function () {
      var checkbox = _react2.default.createElement('input', { type: 'checkbox', name: 'remember', value: 'not this' });
      var attr = (0, _formElementFromState2.default)(checkbox, formState).getKeyVal();
      expect(attr).toHaveMember('checked');
    });

    it('SHOULD return checked attribute TRUE WHEN radio element name is the value', function () {
      var radioTrue = _react2.default.createElement('input', { type: 'radio', name: 'rdoExample', value: 'apple', checked: true });
      var attr = (0, _formElementFromState2.default)(radioTrue, formState).getKeyVal();
      expect(attr.checked).toBe(radioTrue.props.checked);
    });

    it('SHOULD return checked attribute FALSE WHEN radio element name is NOT the value', function () {
      var radioFalse = _react2.default.createElement('input', { type: 'radio', name: 'rdoExample', value: 'oranges', checked: false });
      var attr = (0, _formElementFromState2.default)(radioFalse, formState).getKeyVal();
      expect(attr.checked).toBe(radioFalse.props.checked);
    });

    it('SHOULD return value attr WHEN element is a regular input, select or textarea', function () {
      var foundInput = _react2.default.createElement('input', { name: 'firstName', type: 'text' });
      var attr = (0, _formElementFromState2.default)(foundInput, formState).getKeyVal();
      expect(attr).toHaveMember('value');
    });
  });
});
//# sourceMappingURL=formElementFromStateSpec.js.map