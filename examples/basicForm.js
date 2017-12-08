import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormError, FormActions } from 'react-redux-simple-validate';

class BasicUpdateFormGroup extends Component {
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
    this.updateInputValue = this.updateInputValue.bind(this);
    this.replaceMultiValue = this.replaceMultiValue.bind(this);
    this.mergeMultiValue = this.mergeMultiValue.bind(this);
    this.reset = this.reset.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, triggerValidate } = this.props;
    triggerValidate(name);
  }

  updateInputValue() {
    const { name, setInputValue } = this.props;
    setInputValue(name, {
      exampleInput: 'my new data'
    });
  }

  replaceMultiValue() {
    const { name, setDataReplace } = this.props;
    setDataReplace(name, {
      exampleInput2: 'my new data replace 2'
    });
  }

  mergeMultiValue() {
    const { name, setDataMerge } = this.props;
    setDataMerge(name, {
      exampleInput2: 'my new data merge 2',
      exampleInput3: 'my new data merge 3'
    }, {
      exampleInput: ['Trigger error programatically']
    });
  }

  reset() {
    const { name, reset } = this.props;
    reset(name);
  }

  handleValidForm(data) {
    console.log(JSON.stringify(data));
  }

  render() {
    return (
      <div>
        <h1>Basic Form Example</h1>
        <hr />
        <Form
          formName={this.props.name}
          handleValidForm={this.handleValidForm}
          validation={this.validation}
        >
          <label htmlFor="exampleInput">Input 1 Label</label>
          <input type="text" id="exampleInput" name="exampleInput" value="" placeholder="input 1" />
          <FormError forInput="exampleInput" />
          <br />
          <input type="text" id="exampleInput2" name="exampleInput2" value="" placeholder="input 2" />
          <br />
          <input type="text" id="exampleInput3" name="exampleInput3" value="" placeholder="input 3" />
          <br />
          <button>Submit</button><br /><br />
        </Form>
        <hr />
        <button onClick={this.onSubmit}>Submit outside form</button>
        <button onClick={this.updateInputValue}>Replace Single Value</button>
        <button onClick={this.replaceMultiValue}>Replace Multi Value</button>
        <button onClick={this.mergeMultiValue}>Merge Multi Value</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default connect(null, FormActions)(BasicUpdateFormGroup);
