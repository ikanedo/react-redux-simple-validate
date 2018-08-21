# react-simple-validate

[![Build Status](https://travis-ci.org/ikanedo/react-redux-simple-validate.svg?branch=master)](https://travis-ci.org/ikanedo/react-redux-simple-validate) [![codecov](https://codecov.io/gh/ikanedo/react-redux-simple-validate/branch/develop/graph/badge.svg)](https://codecov.io/gh/ikanedo/react-redux-simple-validate)

React Redux Form validator inspired by jquery validate 
https://github.com/ikanedo/react-redux-simple-validate

## Prerequisite

    % npm install react react-dom redux react-redux

## Installation

    % npm install react-redux-simple-validate

## Usage
See https://codesandbox.io/s/zxwwx9vw6m for a live demo example.

```js

export default class BasicForm extends Component {
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
    this.handleValidForm = this.handleValidForm.bind(this);
  }

  handleValidForm(data) {
    console.log('hand your data here!', data);
  }

  render() {
    return (
        <Form
          formName="basic"
          handleValidForm={this.handleValidForm}
          validation={this.validation}
        >
          <input type="text" name="exampleInput" value="" />
          <button className="button">Submit</button>
          <div>
            <FormError forInput="exampleInput" />
          </div>
        </Form>
    );
  }
}

```

## Required Params
| Method          | Type     | Description                                                                                     |
|-----------------|----------|-------------------------------------------------------------------------------------------------|
| formName        | String   | Unique identifier for this particular Form. This is used as the Redux ID for handling the state |
| handleValidForm | Function | Method to call when form validation is successful                                               |
| validation      | Object   | This contains the rules and messages, see [basicForm.js](https://codesandbox.io/s/q3pr7x8jpq ) for expected schema                      |

## Optional Params

| Method            | Type     | Description                                                                                                                                                                                                       |
|-------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| handleInvalidForm | Function | Method to call if validation is unsuccessful                                                                                                                                                                      |
| defaultValues     | Object   | Use this param for seeding initial data from the server  NOTE: This is not reactive! If you want to change the values programmatically, then dispatch an action (FORM_DATA_REPLACE or FORM_DATA_MERGE).           |
| defaultErrors     | Object   | Use this param for seeding initial error messages from the server  NOTE: This is not reactive! If you want to change the errors programmatically, then dispatch an action (FORM_DATA_REPLACE or FORM_DATA_MERGE). |

## Useful Redux State Actions
See https://codesandbox.io/s/qq87xzkrxq for an example of how to use the following actions below.

| Action Name             | Description                                                                                                                                                                                                                       |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| FORM_DATA_REPLACE       | Replaces the state with the given params(values/errors)                                                                                                                                                                           |
| FORM_INPUT_CHANGE       | Replaces the value of a given input name                                                                                                                                                                           |
| FORM_DATA_MERGE         | Merges the current state with the given params(values/errors)                                                                                                                                                                     |
| FORM_RESET              | Sets values and errors to be empty.  NOTE: If you give the form element a defaultValue, it will be reverted back to that value on reset. If you want to 'clean' the form, then you will need to set the value to an empty string. |
| FORM_TRIGGER_VALIDATION | Programmatically validate a given form name                                                                                                                                                                                                |

## Validation Rules supported
Basic available rules are as follows

```js
const validation = {
  rules: {
    exampleInput: {
      required: true,
      minlength: 2,
      maxlength: 255,
      equalTo: '[name=password]',
      pattern: "^[A-Za-z0-9._'%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$|^$"
    }
  },
  messages: {
    exampleInput: {
      required: 'This is required',
      minlength: 'Too short',
      maxlength: 'Too long',
      equalTo: 'Passwords are not the same',
      pattern: 'Email address format is invalid'
    }
  }
}

```

Other built in rules can be found in the [validate.js website](https://validatejs.org/)

### What if the rule I want is not supported?
[See the FAQ - How do I create a custom validation rule?](docs/faq.md#how-do-i-remove-validation-errors-programmatically-)

## Advanced Usage

See the documentation for [FormGroups](docs/form-groups.md) if you want to build more complex forms.

## FAQ

[See all FAQs](docs/faq.md).
1. [How do I create a custom input component?](docs/faq.md#how-do-i-create-a-custom-input-component-)
1. [How do I change an input value programmatically?](docs/faq.md#how-do-i-change-an-input-value-programmatically-)
1. [How do I ADD validation errors programmatically?](docs/faq.md#how-do-i-add-validation-errors-programmatically-)
1. [How do I REMOVE validation errors programmatically?](docs/faq.md#how-do-i-remove-validation-errors-programmatically-)
1. [How do I change when each input field is validated?](docs/faq.md#how-do-i-change-when-each-input-field-is-validated-)
1. [How do I split my form into multiple components?](docs/faq.md#how-do-i-split-my-form-into-multiple-components-)
