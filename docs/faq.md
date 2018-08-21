# FAQ
## How do I create a custom validation rule?
Internally, the code uses [validate.js](https://validatejs.org/). Please feel free to [create a new adapter](https://validatejs.org/#custom-validator) if a particular rule is not yet supported.

### Example custom validator
For an example of creating a custom UK postcode validator, see https://codesandbox.io/s/pw1x7o5wpj. Alternatively, you can see a short example below.

```js
import { validate } from 'react-redux-simple-validate';

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

## How do I create a custom input component?

The workflow is as follows:
1. Create a valid input element
2. Wrap your element with a decorator component which will contain the custom behaviour for that particular input element.
3. The wrapper component would then pass all the behaviours to your element using **[React.cloneElelement()](https://reactjs.org/docs/react-api.html#cloneelement)** and **[React.Children()](https://reactjs.org/docs/react-api.html#reactchildren)** methods.

In your form, you would consume it like so:


```js
  render() {
    return (
        <Form
          formName="basic"
          handleValidForm={this.handleValidForm}
          validation={this.validation}
        >
          <CustomFormElementDecorator>
            <input type="text" name="exampleInput" value="" />
          </CustomFormElementDecorator>
        </Form>
    );
  }
```

For a working example, please see the following examples
1. Textarea with character count - https://codesandbox.io/s/llvk10lwz7
2. Password input with mask toggle - https://codesandbox.io/s/5k13v713x4

## How do I change an input value programmatically?
You need to dispatch one of the following redux actions

1. `setInputValue(formName, { inputName: 'value' })`
2. `setDataReplace(formName, { inputName: 'value' })`
3. `setDataMerge(formName, { inputName: 'value' })`
3. `reset(formName)`

For a working example please see https://codesandbox.io/s/qq87xzkrxq

## How do I ADD validation errors programmatically?
Ideally, you should create a custom validator. However, there are cases where you have to set the validation error programmatically.

You need to dispatch one of the following redux actions

1. `setSingleValidity(formName, { inputName: ['This is an error'] })`
1. `setValidity(formName, { inputName: ['This is an error'], inputName2: ['This is another error'] })`

For a working example please see https://codesandbox.io/s/8mjp2l08

## How do I REMOVE validation errors programmatically?
You need to dispatch one of the following redux actions

1. `setSingleValidity(formName, { inputName: null })`
1. `setValidity(formName, {})`

For a working example please see https://codesandbox.io/s/pw7q2y0xrm

## How do I change when each input field is validated?
By default, we check if a field is valid `onChange` and we check if it is invalid `onBlur`. We can change the events by passing the following props

```js
  render() {
    return (
        <Form
          ...
          invalidateEvent="onBlur"
          validateEvent="onChange"
        >
          ...
        </Form>
    );
  }
```

For a working example please see https://codesandbox.io/s/0y9xv2jzy0

## How do I split my form into multiple components?
Please see the [documentation for FormGroups](form-groups.md) for more information on this topic.

## How do I validate some input fields but not others?
You would need to group your input fields into different **FormGroups**.

For a working example please see https://codesandbox.io/s/ox145n0w3z

Please see the [documentation for FormGroups](form-groups.md) for more information on this topic.
