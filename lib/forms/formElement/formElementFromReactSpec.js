'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formElementFromReact = require('./formElementFromReact');

var _formElementFromReact2 = _interopRequireDefault(_formElementFromReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('FormElementFromReact', function () {
  describe('Use this to get the value from the React object', function () {
    describe('WHEN input type is text, number, password, email', function () {
      function mockInputAndRef(type, name) {
        var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'val';

        return {
          input: _react2.default.createElement('input', { type: type, name: name }),
          refs: _defineProperty({}, name, {
            value: val
          })
        };
      }

      it('SHOULD return null for unknown elements', function () {
        var inputValue = (0, _formElementFromReact2.default)({
          type: 'button'
        }, null).getKeyVal();
        expect(inputValue).toBeNull();
      });

      it('SHOULD return undefined for untouched form elements', function () {
        var name = 'undefinedEl';
        var inputValue = (0, _formElementFromReact2.default)(_react2.default.createElement('input', { type: 'text', name: name }), {}).getKeyVal();
        expect(inputValue.name).toBeUndefined();
      });

      it('SHOULD return the value for text input elements', function () {
        var INPUT = 'text-member';
        var mock = mockInputAndRef('text', INPUT);
        var inputValue = (0, _formElementFromReact2.default)(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });

      it('SHOULD return the value for password input elements', function () {
        var INPUT = 'password-member';
        var mock = mockInputAndRef('password', INPUT);
        var inputValue = (0, _formElementFromReact2.default)(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });

      it('SHOULD return the value for email input elements', function () {
        var INPUT = 'email-member';
        var mock = mockInputAndRef('email', INPUT);
        var inputValue = (0, _formElementFromReact2.default)(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });

      it('SHOULD return the value for number input elements', function () {
        var INPUT = 'number-member';
        var mock = mockInputAndRef('number', INPUT, 123);
        var inputValue = (0, _formElementFromReact2.default)(mock.input, mock.refs).getKeyVal();
        expect(inputValue).toBeNonEmptyObject();
      });
    });

    it('SHOULD return the value for textarea elements', function () {
      var INPUT = 'textarea-member';
      var textarea = {
        type: 'textarea',
        props: {
          type: 'textarea',
          name: INPUT
        }
      };
      var refs = _defineProperty({}, INPUT, {
        value: 'dummy text data'
      });
      var inputValue = (0, _formElementFromReact2.default)(textarea, refs).getKeyVal();
      expect(inputValue[INPUT]).toBe('dummy text data');
    });

    it('SHOULD return the value for select elements', function () {
      var INPUT = 'select-member';
      var select = _react2.default.createElement('select', { name: INPUT });
      var refs = _defineProperty({}, INPUT, {
        value: 'GB'
      });
      var inputValue = (0, _formElementFromReact2.default)(select, refs).getKeyVal();
      expect(inputValue[INPUT]).toBe('GB');
    });

    it('SHOULD return a boolean value for checkbox inputs', function () {
      var CHKBOX_NAME = 'sameAsDelivery';
      var checkbox = _react2.default.createElement('input', { name: CHKBOX_NAME, type: 'checkbox' });
      var refs = _defineProperty({}, CHKBOX_NAME, {
        value: 'not this',
        checked: true
      });
      var inputValue = (0, _formElementFromReact2.default)(checkbox, refs).getKeyVal();
      expect(inputValue).toBeNonEmptyObject();
    });

    it('SHOULD return value for selected radio inputs', function () {
      var RADIO_NAME = 'radio1';
      var radio = _react2.default.createElement('input', { name: RADIO_NAME, type: 'radio', value: 'GB' });
      var refs = _defineProperty({}, RADIO_NAME + 'GB', {
        value: 'GB',
        checked: true
      });
      var inputValue = (0, _formElementFromReact2.default)(radio, refs).getKeyVal();
      expect(inputValue[RADIO_NAME]).toBe('GB');
    });

    it('SHOULD NOT return value for unselected radio inputs', function () {
      var RADIO_NAME = 'radio1';
      var radio = _react2.default.createElement('input', { name: RADIO_NAME, type: 'radio', value: 'GB' });
      var refs = _defineProperty({}, RADIO_NAME + 'GB', {
        value: 'GB',
        checked: false
      });
      var inputValue = (0, _formElementFromReact2.default)(radio, refs).getKeyVal();
      expect(inputValue).toBeNull();
    });
  });
});
//# sourceMappingURL=formElementFromReactSpec.js.map