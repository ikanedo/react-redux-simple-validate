import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from '../validators/validator';
import formElementFromEvt from './formElement/formElementFromEvt';
import formBuilder from './formBuilder';
import { filterValidation, getFormData } from './formUtils';
import * as FormActions from './formActions';

export class FormGroupDefault extends Component {
  constructor(props) {
    super(props);
    this.onValidate = this.onValidate.bind(this);
    this.onInvalidate = this.onInvalidate.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formValidator = new Validator(filterValidation(props));
    this.stringRefs = {};
  }

  componentDidMount() {
    const {
      formName,
      defaultErrors,
      defaultValues,
      setInitialData
    } = this.props;

    if (defaultErrors || defaultValues) {
      setInitialData(
        formName,
        defaultValues,
        defaultErrors
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validation !== this.props.validation) {
      this.formValidator.setConstraints(filterValidation(nextProps));
    }

    if (nextProps.isTriggerValidation) {
      this.onSubmit();
      this.props.triggerValidate(nextProps.formName, false);
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      values,
      errors,
      children
    } = this.props;
    const isSameValues = values === nextProps.values;
    const isSameErrors = errors === nextProps.errors;
    const isSameChildren = children === nextProps.children;
    return !(isSameValues && isSameErrors && isSameChildren);
  }

  onSubmit() {
    const {
      children,
      formName,
      setValidity,
      handleValidForm,
      handleInvalidForm
    } = this.props;
    const formData = getFormData(children, this.stringRefs);
    const errorMsgs = this.formValidator.validate(formData);
    setValidity(formName, errorMsgs);

    const isValid = !errorMsgs;
    if (isValid) {
      handleValidForm(formData, formName);
    } else {
      handleInvalidForm(errorMsgs, formName);
    }
  }

  onValidate(e) {
    const {
      children,
      formName,
      setSingleValidity
    } = this.props;

    const formData = getFormData(children, this.stringRefs);
    const errorMsgs = this.formValidator.single(e.target.name, formData);
    const isValid = !errorMsgs;

    if (isValid) {
      setSingleValidity(
        formName,
        { [e.target.name]: errorMsgs }
      );
    }
  }

  onInvalidate(e) {
    const {
      children,
      formName,
      setSingleValidity
    } = this.props;
    const formData = getFormData(children, this.stringRefs);
    const errorMsgs = this.formValidator.single(e.target.name, formData);
    const isValid = !errorMsgs;

    if (!isValid) {
      setSingleValidity(
        formName,
        { [e.target.name]: errorMsgs }
      );
    }
  }

  onValueChange(e) {
    const {
      formName,
      setInputValue
    } = this.props;

    setInputValue(
      formName,
      { [e.target.name]: formElementFromEvt(e).getVal() }
    );
  }

  render() {
    const {
      children,
      values,
      errors,
      invalidateEvent,
      validateEvent,
      className
    } = this.props;
    const formElements = formBuilder({
      stringRefs: this.stringRefs,
      onValidate: this.onValidate,
      onInvalidate: this.onInvalidate,
      onValueChange: this.onValueChange,
      values,
      errors,
      children,
      invalidateEvent,
      validateEvent
    });

    return (
      <div className={`form-group ${className || ''}`}>
        {formElements}
      </div>
    );
  }
}

FormGroupDefault.displayName = 'FormGroup';
FormGroupDefault.defaultProps = {
  invalidateEvent: 'onBlur',
  validateEvent: 'onChange',
  handleInvalidForm: () => {}
};

FormGroupDefault.propTypes = {
  children: PropTypes.node.isRequired,
  validation: PropTypes.shape({
    rules: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }),
  handleValidForm: PropTypes.func.isRequired,
  handleInvalidForm: PropTypes.func,
  formName: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  defaultValues: PropTypes.object,
  defaultErrors: PropTypes.object,
  setInitialData: PropTypes.func.isRequired,
  setValidity: PropTypes.func.isRequired,
  setSingleValidity: PropTypes.func.isRequired,
  setInputValue: PropTypes.func.isRequired,
  triggerValidate: PropTypes.func,
  invalidateEvent: PropTypes.string,
  validateEvent: PropTypes.string,
  className: PropTypes.string
};

function mapStateToProps(state, props) {
  const formState = state.Forms[props.formName] || {};
  return {
    values: formState.values || {},
    errors: formState.errors || {},
    isTriggerValidation: !!formState.isTriggerValidation
  };
}

export default connect(mapStateToProps, FormActions)(FormGroupDefault);
