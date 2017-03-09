'use strict';

var _formElementFromEvt = require('./formElementFromEvt');

var _formElementFromEvt2 = _interopRequireDefault(_formElementFromEvt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FormElementFromEvt', function () {
  describe('Use this to get the value from the event object', function () {
    it('SHOULD call FormElementFromEvt instance', function () {
      var inputValue = (0, _formElementFromEvt2.default)({
        target: 'dummy'
      });
      expect(inputValue.constructor.name).toBe('FormElementFromEvt');
    });

    it('SHOULD return the value of a text field', function () {
      var inputValue = (0, _formElementFromEvt2.default)({
        target: {
          value: 'Text'
        }
      }).getVal();
      expect(inputValue).toBe('Text');
    });

    it('SHOULD return an empty string if the value is undefined', function () {
      var inputValue = (0, _formElementFromEvt2.default)({
        target: {}
      }).getVal();
      expect(inputValue).toBe('');
    });

    it('SHOULD return a boolean value for checkboxes', function () {
      var inputValue = (0, _formElementFromEvt2.default)({
        target: {
          type: 'checkbox',
          checked: false,
          value: 'not this'
        }
      }).getVal();
      expect(inputValue).toBeBoolean();
      expect(inputValue).not.toBe('not this');
    });
  });
});
//# sourceMappingURL=formElementFromEvtSpec.js.map