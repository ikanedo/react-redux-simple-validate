# react-simple-validate
React Redux Form validator inspired by jquery validate 
https://github.com/ikanedo/react-redux-simple-validate

## Installation

    % npm install react-redux-simple-validate

## Demo
For a demo project setup, see https://github.com/ikanedo/react-redux-simple-validator-example

## Usage

### Basic form component.

Run the demo project and see "basicForm.js" for implementation details.

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
          <div id="add-error-class-to-this-div" data-form-error="exampleInput">
            <input type="text" name="exampleInput" value="" />
            <button className="button">Submit</button>
          </div>
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
| validation      | Object   | This contains the rules and messages, see basicForm.js for expected schema                      |

## Optional Params

| Method            | Type     | Description                                                                                                                                                                                                       |
|-------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| handleInvalidForm | Function | Method to call if validation is unsuccessful                                                                                                                                                                      |
| defaultValues     | Object   | Use this param for seeding initial data from the server  NOTE: This is not reactive! If you want to change the values programmatically, then dispatch an action (FORM_DATA_REPLACE or FORM_DATA_MERGE).           |
| defaultErrors     | Object   | Use this param for seeding initial error messages from the server  NOTE: This is not reactive! If you want to change the errors programmatically, then dispatch an action (FORM_DATA_REPLACE or FORM_DATA_MERGE). |

## Useful Redux State Actions
Please see formActions.js for the related action creators. There are other actions that can be dispatched but for simplicity's sake, the actions below are probably the only ones you will need to use.

| Action Name             | Description                                                                                                                                                                                                                       |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| FORM_DATA_REPLACE       | Replaces the state with the given params(values/errors)                                                                                                                                                                           |
| FORM_DATA_MERGE         | Merges the current state with the given params(values/errors)                                                                                                                                                                     |
| FORM_RESET              | Sets values and errors to be empty.  NOTE: If you give the form element a defaultValue, it will be reverted back to that value on reset. If you want to 'clean' the form, then you will need to set the value to an empty string. |
| FORM_TRIGGER_VALIDATION | Programmatically validate a given form name                                                                                                                                                                                                |

## Validation Rules supported
Available rules are as follows

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

### What if the rule I want is not supported?
Internally, the code uses [validate.js](https://validatejs.org/). Please feel free to [create a new adapter](https://validatejs.org/#custom-validator) if a particular rule is not yet supported.

### Example custom validator
```js
import validate from 'validate.js';

const isThisABoolean = value => typeof(value) === "boolean";

validate.validators.boolean = (value, options) => {  
  return isThisABoolean(value) ? null : options.message;
};

```

Once you have created your custom validator, simply inject the custom validator to your app and use it like so
```js
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
