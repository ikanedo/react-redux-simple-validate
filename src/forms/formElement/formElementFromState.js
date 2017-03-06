import { getFormInputType } from './formElementUtils';

export class FormElementFromState {
  constructor(element, values = {}) {
    const {
      name,
      value,
      type
    } = element.props;

    this.name = name;
    this.value = value;
    this.stateValues = values;
    this.type = getFormInputType(type);
  }

  getKeyVal() {
    if (this.stateValues.hasOwnProperty(this.name)) {
      return this[this.type]();
    }

    return null;
  }

  checkbox() {
    return { checked: this.stateValues[this.name] };
  }

  radio() {
    return { checked: this.stateValues[this.name] === this.value };
  }

  default() {
    return { value: this.stateValues[this.name] };
  }
}

export default function formElementFromState(...args) {
  return new FormElementFromState(...args);
}
