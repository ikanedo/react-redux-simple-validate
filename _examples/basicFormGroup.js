import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { store } from './basicStore';
import { Provider, connect } from 'react-redux';
import FormGroup from 'src/forms/formGroup';
import FormError from 'src/forms/formError';
import * as formActions from 'src/forms/formActions';

export default class BasicFormGroup extends Component {
  constructor() {
    super();
    this.validation = {
      rules: {
        exampleInput: {
          required: true
        }
      },
      messages: {
        exampleInput: {
          required: 'This is required'
        }
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleValidForm = this.handleValidForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, dispatch } = this.props;
    dispatch(
      formActions.triggerValidate(name)
    );
  }

  handleValidForm() {
    console.log('call a Redux thunk here to submit your data to the server!');
  }

  render() {
    return (
      <div>
        <hr />
        <FormGroup
          formName={this.props.name}
          handleValidForm={this.handleValidForm}
          validation={this.validation}
        >
          <input type="text" name="exampleInput" value="" />
          <FormError forInput="exampleInput" />
          <br />
        </FormGroup>
        <button className="button" onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

BasicFormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const ConnectedBasicFormGroup = connect()(BasicFormGroup);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedBasicFormGroup name="BasicFormGroup" />
  </Provider>,
  document.getElementById('basicFormGroup')
);
