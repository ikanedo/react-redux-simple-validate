# react-simple-validate

[![Build Status](https://travis-ci.org/ikanedo/react-redux-simple-validate.svg?branch=master)](https://travis-ci.org/ikanedo/react-redux-simple-validate) [![codecov](https://codecov.io/gh/ikanedo/react-redux-simple-validate/branch/develop/graph/badge.svg)](https://codecov.io/gh/ikanedo/react-redux-simple-validate)

React Redux Form validator inspired by jquery validate 
https://github.com/ikanedo/react-redux-simple-validate

## Installation

    % npm install react-redux-simple-validate

## Usage
See https://codesandbox.io/s/GZMqXLo45 for a live demo example.

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
| validation      | Object   | This contains the rules and messages, see [basicForm.js](https://codesandbox.io/s/GZMqXLo45 ) for expected schema                      |

## Optional Params

| Method            | Type     | Description                                                                                                                                                                                                       |
|-------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| handleInvalidForm | Function | Method to call if validation is unsuccessful                                                                                                                                                                      |
| defaultValues     | Object   | Use this param for seeding initial data from the server  NOTE: This is not reactive! If you want to change the values programmatically, then dispatch an action (FORM_DATA_REPLACE or FORM_DATA_MERGE).           |
| defaultErrors     | Object   | Use this param for seeding initial error messages from the server  NOTE: This is not reactive! If you want to change the errors programmatically, then dispatch an action (FORM_DATA_REPLACE or FORM_DATA_MERGE). |

## Useful Redux State Actions
See https://codesandbox.io/s/qlmyl35m44 for an example of how to use the following actions below.

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
Internally, the code uses [validate.js](https://validatejs.org/). Please feel free to [create a new adapter](https://validatejs.org/#custom-validator) if a particular rule is not yet supported.

### Example custom validator
For an example of creating a custom UK postcode validator, see https://codesandbox.io/s/ADK1ojWOp. Alternatively, you can see a short example below.

```js
import validate from 'validate.js';

const isThisABoolean = value => typeof(value) === "boolean";

validate.validators.boolean = (value, options) => {  
  return isThisABoolean(value) ? null : options.message;
};

```

Once you have created your custom validator, simply inject the custom validator to your app and use it like so
```js
import './booleanValidator';

const validation = {
  rules: {
    exampleInput: {
      boolean: true
    }
  },
  messages: {
    exampleInput: {
      boolean: 'The value passed is not TRUE or FALSE'
    }
  }
}
```

## Advanced Usage

See the documentation for [FormGroups](docs/form-groups.md) if you want to build more complex forms.
