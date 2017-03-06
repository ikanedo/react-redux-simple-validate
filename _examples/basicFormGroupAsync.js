import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { store } from './basicStore';
import { Provider, connect } from 'react-redux';
import FormGroup from 'src/forms/formGroup';
import FormError from 'src/forms/formError';
import FormGroupAsync from 'src/forms/formGroupAsync';
import * as FormActions from 'src/forms/formActions';

const validationRules = {
  rules: {
    firstName: {
      required: true
    },
    lastName: {
      required: true
    },
    line1: {
      required: true
    },
    town: {
      required: true
    },
    postalCode: {
      required: true
    },
    country: {
      required: true
    }
  },
  messages: {
    firstName: {
      required: 'Please enter your first name'
    },
    lastName: {
      required: 'Please enter your last name'
    },
    line1: {
      required: 'Please enter your Address'
    },
    town: {
      required: 'Please enter your Town'
    },
    postalCode: {
      required: 'Please enter your Postcode'
    },
    country: {
      required: 'Please select your Country'
    }
  }
};

export class BasicFormGroupAsync extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleValidForm = this.handleValidForm.bind(this);

    /*
      Initialise FormGroupAsync
      @param {string} formName - The ID for this form
      @param {array} groups - List of the groups we need to wait for before calling success method
    */
    this.formGroups = new FormGroupAsync({
      formName: props.name,
      groups: ['details', 'address']
    });
  }

  onSubmit() {
    const { triggerValidate } = this.props;

    /*
    WHEN the user clicks submit
    THEN iterate through each formGroup and dispatch an action to validate each group
    IF all formGroups are valid/resolved THEN execute the success handler
    ELSE IF a formGroup is invalid/rejected THEN log the error in the console

    NOTE: This is one of many ways of handling async groups, we can also have
    multiple onSubmit handlers (1 button per group) etc. depending on the use case.
    */
    this.formGroups
      .each(group => triggerValidate(group))
      .then(this.handleValidForm, true)
      .fail((err) => {
        console.log('A group was invalidated', err);
      });
  }

  handleValidForm(data) {
    console.log('All group data is ready to send!', data);
  }

  render() {
    return (
      <div>
        <hr />
        Form Group - Personal Details
        <FormGroup
          formName={
            /*
            To ensure we avoid common mistakes like misspelling of formGroup names,
            always grab the formGroup name from the formGroupAsync instance
            as spelling bugs are common and notoriously hard to find
            */
            this.formGroups.getName('details')
          }
          handleValidForm={
            /*
            WHEN the triggerValidate action dispatcher is called
            AND the formGroup is valid
            THEN give FormGroupAsync the valid data
            AND tell it to store the data for this formGroup
            */
            this.formGroups.resolve
          }
          handleInvalidForm={
            /*
            WHEN the triggerValidate action dispatcher is called
            AND the formGroup is invalid
            THEN give FormGroupAsync the error message
            AND tell it to remove any stored data (if any)
            */
            this.formGroups.reject
          }
          validation={validationRules}
        >
          <div className="form-input">
            <label className="form-input__label" htmlFor="firstName">First Name</label>
            <input className="form-input__input" name="firstName"
              id="firstName" type="text" value=""
            />
            <FormError forInput="firstName" />
          </div>
          <div className="form-input">
            <label className="form-input__label" htmlFor="lastName">Last Name</label>
            <input className="form-input__input" name="lastName"
              id="lastName" type="text" value=""
            />
            <FormError forInput="lastName" />
          </div>
        </FormGroup>
        <hr />
        Form Group - Address
        {/* See cleaner implementation here without the annotation noise above */}
        <FormGroup
          formName={this.formGroups.getName('address')}
          handleValidForm={this.formGroups.resolve}
          handleInvalidForm={this.formGroups.reject}
          validation={validationRules}
        >
          <div className="form-input">
            <label className="form-input__label" htmlFor="line1">Address</label>
            <input className="form-input__input" name="line1" id="line1" type="text" value="" />
            <FormError forInput="line1" />
          </div>
          <div className="form-input">
            <label className="form-input__label" htmlFor="town">Town</label>
            <input className="form-input__input" name="town" type="text" id="town" value="" />
            <FormError forInput="town" />
          </div>
        </FormGroup>
        <hr />
        <button className="button" onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

BasicFormGroupAsync.propTypes = {
  name: PropTypes.string.isRequired,
  triggerValidate: PropTypes.func.isRequired
};

const ConnectedBasicFormGroupAsync = connect(null, FormActions)(BasicFormGroupAsync);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedBasicFormGroupAsync name="BasicFormGroupAsync" />
  </Provider>,
  document.getElementById('basicFormGroupAsync')
);

