import { getFormElementType, getFormElementRefName } from './formElementUtils';

export class FormElementFromReact {
  constructor(element, refs) {
    this.element = element;
    this.refs = refs;
    this.type = getFormElementType(element);
  }

  ref() {
    return this.refs[getFormElementRefName(this.element)] || {};
  }

  getKeyVal() {
    return this[this.type]();
  }

  notype() { // eslint-disable-line
    return null;
  }

  radio() {
    if (this.ref().checked) {
      return { [this.element.props.name]: this.ref().value };
    }

    return null;
  }

  checkbox() {
    return { [this.element.props.name]: this.ref().checked };
  }

  select() {
    return { [this.element.props.name]: this.ref().value };
  }

  default() {
    return { [this.element.props.name]: this.ref().value };
  }
}

export default function formElementFromReact(...args) {
  return new FormElementFromReact(...args);
}
