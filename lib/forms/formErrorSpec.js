'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _formConstants = require('./formConstants');

var _formError = require('./formError');

var _formError2 = _interopRequireDefault(_formError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form Error', function () {
  it('should render error className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_formError2.default, { forInput: 'dummyName' }));
    expect(wrapper.hasClass(_formConstants.ERROR_MSG_CLASS_NAME + '--dummyName')).toBe(true);
  });

  it('should render error message', function () {
    var errorMsg = 'error message dummy';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_formError2.default, { forInput: 'dummyName', msg: errorMsg }));
    expect(wrapper.contains(errorMsg)).toBe(true);
  });
});
//# sourceMappingURL=formErrorSpec.js.map