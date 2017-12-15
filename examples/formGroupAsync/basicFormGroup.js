import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormError, FormActions, FormGroupAsync } from 'react-redux-simple-validate';
import validationRules from './validation';
import PhoneNumber from './phoneNumber';
import RegionGroup from './regionGroup';

class BasicFormGroupAsync extends Component {
  constructor(props) {
    super(props);
    this.validation = validationRules;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleValidForm = this.handleValidForm.bind(this);
    this.resetRegion = this.resetRegion.bind(this);

    /*
      Initialise FormGroupAsync
      @param {string} formName - The ID for this form
      @param {array} groups - List of the groups we need to wait for before calling success method
    */
    this.formGroups = new FormGroupAsync({
      formName: props.name,
      groups: ['details', 'address', 'phoneNumber', 'region']
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

  handleValidForm(data) { // eslint-disable-line
    console.log('All group data is ready to send!', data);
  }

  resetRegion() {
    this.props.reset(this.formGroups.getName('region')); // this is a FormActions method
  }

  render() {
    return (
      <div>
        <h1>Basic Form Group Example</h1>
        <hr />
        Form Group - Personal Details
        <fieldset>
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
            validation={this.validation}
          >
            <div className="form-input">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                value=""
              />
              <FormError forInput="firstName" />
            </div>
            <div className="form-input">
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                value=""
              />
              <FormError forInput="lastName" />
            </div>
          </FormGroup>
        </fieldset>
        <hr />
        Form Group - Address
        {/* See cleaner implementation here without the annotation noise above */}
        <fieldset>
          <FormGroup
            formName={this.formGroups.getName('address')}
            handleValidForm={this.formGroups.resolve}
            handleInvalidForm={this.formGroups.reject}
            validation={this.validation}
          >
            <div className="form-input">
              <label htmlFor="line1">Address</label>
              <input name="line1" id="line1" type="text" value="" />
              <FormError forInput="line1" />
            </div>
            <div className="form-input">
              <label htmlFor="town">Town</label>
              <input name="town" type="text" id="town" value="" />
              <FormError forInput="town" />
            </div>
            <div className="form-input">
              <label htmlFor="postalCode">Postal Code</label>
              <input name="postalCode" type="text" id="postalCode" value="" />
              <FormError forInput="postalCode" />
            </div>
          </FormGroup>

          <hr />
          <RegionGroup
            formGroups={this.formGroups}
            validation={this.validation}
            resetRegion={this.resetRegion}
          />
        </fieldset>
        <hr />
        <PhoneNumber
          formGroups={this.formGroups}
          validation={this.validation}
        />
        <button className="button" onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default connect(null, FormActions)(BasicFormGroupAsync);
