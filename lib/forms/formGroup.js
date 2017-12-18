'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var FormGroupDefault = function (_Component) {
  _inherits(FormGroupDefault, _Component);

  function FormGroupDefault(props) {
    _classCallCheck(this, FormGroupDefault);

    var _this = _possibleConstructorReturn(this, (FormGroupDefault.__proto__ || Object.getPrototypeOf(FormGroupDefault)).call(this, props));

    _this.onValidate = _this.onValidate.bind(_this);
    _this.onInvalidate = _this.onInvalidate.bind(_this);
    _this.onValueChange = _this.onValueChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.formValidator = new _validator2.default((0, _formUtils.filterValidation)(props));
    _this.stringRefs = {};
    return _this;
  }

  _createClass(FormGroupDefault, [{
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

      var isSameValues = JSON.stringify(values) === JSON.stringify(nextProps.values);
      var isSameErrors = JSON.stringify(errors) === JSON.stringify(nextProps.errors);
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
          handleInvalidForm = _props3.handleInvalidForm;

      var formData = (0, _formUtils.getFormData)(children, this.stringRefs);
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


      var formData = (0, _formUtils.getFormData)(children, this.stringRefs);
      var errorMsgs = this.formValidator.single(e.target.name, formData);
      var isValid = !errorMsgs;

      if (isValid) {
        setSingleValidity(formName, _defineProperty({}, e.target.name, errorMsgs));
      }
    }
  }, {
    key: 'onInvalidate',
    value: function onInvalidate(e) {
      var _props5 = this.props,
          children = _props5.children,
          formName = _props5.formName,
          setSingleValidity = _props5.setSingleValidity;

      var formData = (0, _formUtils.getFormData)(children, this.stringRefs);
      var errorMsgs = this.formValidator.single(e.target.name, formData);
      var isValid = !errorMsgs;

      if (!isValid) {
        setSingleValidity(formName, _defineProperty({}, e.target.name, errorMsgs));
      }
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange(e) {
      var _props6 = this.props,
          formName = _props6.formName,
          setInputValue = _props6.setInputValue;


      setInputValue(formName, _defineProperty({}, e.target.name, (0, _formElementFromEvt2.default)(e).getVal()));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props,
          children = _props7.children,
          values = _props7.values,
          errors = _props7.errors,
          invalidateEvent = _props7.invalidateEvent,
          validateEvent = _props7.validateEvent,
          className = _props7.className;

      var formElements = (0, _formBuilder2.default)({
        stringRefs: this.stringRefs,
        onValidate: this.onValidate,
        onInvalidate: this.onInvalidate,
        onValueChange: this.onValueChange,
        values: values,
        errors: errors,
        children: children,
        invalidateEvent: invalidateEvent,
        validateEvent: validateEvent
      });

      return _react2.default.createElement(
        'div',
        { className: 'form-group ' + (className || '') },
        formElements
      );
    }
  }]);

  return FormGroupDefault;
}(_react.Component);

FormGroupDefault.displayName = 'FormGroup';
FormGroupDefault.defaultProps = {
  invalidateEvent: 'onBlur',
  validateEvent: 'onChange',
  handleInvalidForm: function handleInvalidForm() {}
};

function mapStateToProps(state, props) {
  var formState = state.Forms[props.formName] || {};
  return {
    values: formState.values || {},
    errors: formState.errors || {},
    isTriggerValidation: !!formState.isTriggerValidation
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, FormActions)(FormGroupDefault);
//# sourceMappingURL=formGroup.js.map