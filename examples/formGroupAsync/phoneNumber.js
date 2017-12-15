import React, { Component } from 'react';
import { FormGroup, FormError } from 'react-redux-simple-validate';

export default class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.onRemovePhone = this.onRemovePhone.bind(this);
    this.onAddPhone = this.onAddPhone.bind(this);

    this.state = {
      hasPhoneNumber: true
    };
  }

  onRemovePhone() {
    this.props.formGroups.removeGroup('phoneNumber');
    this.setState({
      hasPhoneNumber: false
    });
  }

  onAddPhone() {
    this.props.formGroups.addGroup('phoneNumber');
    this.setState({
      hasPhoneNumber: true
    });
  }

  render() {
    const {
      formGroups,
      validation
    } = this.props;

    if (!this.state.hasPhoneNumber) {
      return <button onClick={this.onAddPhone}>Add phone number</button>;
    }

    return (
      <fieldset>
        <FormGroup
          formName={formGroups.getName('phoneNumber')}
          handleValidForm={formGroups.resolve}
          handleInvalidForm={formGroups.reject}
          validation={validation}
        >
          <div className="form-input">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input name="phoneNumber" type="text" id="phoneNumber" value="" />
            <button type="button" className="btn btn-danger btn-small" onClick={this.onRemovePhone}>
              <span aria-hidden="true">&times;</span>
            </button>
            <FormError forInput="phoneNumber" />
          </div>
        </FormGroup>
      </fieldset>
    );
  }
}
