'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _validator = require('../validators/validator');

var _validator2 = _interopRequireDefault(_validator);

var _formElementFromEvt = require('./formElement/formElementFromEvt');

var _formElementFromEvt2 = _interopRequireDefault(_formElementFromEvt);

var _formBuilder = require('./formBuilder');

var _formBuilder2 = _interopRequireDefault(_formBuilder);

var _formUtils = require('./formUtils');

var _formActions = require('./formActions');

var FormActions = _interopRequireWildcard(_formActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormGroup = exports.FormGroup = function (_Component) {
  _inherits(FormGroup, _Component);

  function FormGroup(props) {
    _classCallCheck(this, FormGroup);

    var _this = _possibleConstructorReturn(this, (FormGroup.__proto__ || Object.getPrototypeOf(FormGroup)).call(this, props));

    _this.onValidate = _this.onValidate.bind(_this);
    _this.onValueChange = _this.onValueChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.formValidator = new _validator2.default((0, _formUtils.filterValidation)(props));
    return _this;
  }

  _createClass(FormGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          formName = _props.formName,
          defaultErrors = _props.defaultErrors,
          defaultValues = _props.defaultValues,
          setInitialData = _props.setInitialData;


      if (defaultErrors || defaultValues) {
        setInitialData(formName, defaultValues, defaultErrors);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.validation !== this.props.validation) {
        this.formValidator.setConstraints((0, _formUtils.filterValidation)(nextProps));
      }

      if (nextProps.isTriggerValidation) {
        this.onSubmit();
        this.props.triggerValidate(nextProps.formName, false);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props2 = this.props,
          values = _props2.values,
          errors = _props2.errors,
          children = _props2.children;

      var isSameValues = values === nextProps.values;
      var isSameErrors = errors === nextProps.errors;
      var isSameChildren = children === nextProps.children;
      return !(isSameValues && isSameErrors && isSameChildren);
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit() {
      var _props3 = this.props,
          children = _props3.children,
          formName = _props3.formName,
          setValidity = _props3.setValidity,
          handleValidForm = _props3.handleValidForm,
          _props3$handleInvalid = _props3.handleInvalidForm,
          handleInvalidForm = _props3$handleInvalid === undefined ? function () {} : _props3$handleInvalid;

      var formData = (0, _formUtils.getFormData)(children, this.refs);
      var errorMsgs = this.formValidator.validate(formData);
      setValidity(formName, errorMsgs);

      var isValid = !errorMsgs;
      if (isValid) {
        handleValidForm(formData, formName);
      } else {
        handleInvalidForm(errorMsgs, formName);
      }
    }
  }, {
    key: 'onValidate',
    value: function onValidate(e) {
      var _props4 = this.props,
          children = _props4.children,
          formName = _props4.formName,
          setSingleValidity = _props4.setSingleValidity;

      var formData = (0, _formUtils.getFormData)(children, this.refs);
      var errorMsgs = this.formValidator.single(e.target.name, formData);
      setSingleValidity(formName, _defineProperty({}, e.target.name, errorMsgs));
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange(e) {
      var _props5 = this.props,
          formName = _props5.formName,
          setInputValue = _props5.setInputValue;


      setInputValue(formName, _defineProperty({}, e.target.name, (0, _formElementFromEvt2.default)(e).getVal()));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          children = _props6.children,
          values = _props6.values,
          errors = _props6.errors;

      var formElements = (0, _formBuilder2.default)({
        onValidate: this.onValidate,
        onValueChange: this.onValueChange,
        values: values,
        errors: errors,
        children: children
      });

      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        formElements
      );
    }
  }]);

  return FormGroup;
}(_react.Component);

FormGroup.propTypes = {
  children: _react.PropTypes.node.isRequired,
  validation: _react.PropTypes.shape({
    rules: _react.PropTypes.object.isRequired,
    messages: _react.PropTypes.object.isRequired
  }),
  handleValidForm: _react.PropTypes.func.isRequired,
  handleInvalidForm: _react.PropTypes.func,
  formName: _react.PropTypes.string.isRequired,
  values: _react.PropTypes.object.isRequired,
  errors: _react.PropTypes.object.isRequired,
  defaultValues: _react.PropTypes.object,
  defaultErrors: _react.PropTypes.object,
  setInitialData: _react.PropTypes.func.isRequired,
  setValidity: _react.PropTypes.func.isRequired,
  setSingleValidity: _react.PropTypes.func.isRequired,
  setInputValue: _react.PropTypes.func.isRequired,
  triggerValidate: _react.PropTypes.func
};

function mapStateToProps(state, props) {
  var formState = state.Forms[props.formName] || {};
  return {
    values: formState.values || {},
    errors: formState.errors || {},
    isTriggerValidation: !!formState.isTriggerValidation
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, FormActions)(FormGroup);
//# sourceMappingURL=formGroup.js.map