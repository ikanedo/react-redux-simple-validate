# react-simple-validate
React Redux Form validator inspired by jquery validate

## Installation

    % npm install react-simple-validate

## Demo

    % npm run start

## Usage

### Basic form component.

Run the demo and see the "_examples" directory for implementation examples.

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

  handleValidForm() {
    console.log('call a Redux thunk here to submit your data to the server!');
  }

  render() {
    return (
        <Form
          formName={this.props.name}
          handleValidForm={this.handleValidForm}
          validation={this.validation}
        >
          <div>
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