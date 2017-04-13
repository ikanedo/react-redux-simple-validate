export class FormElementFromEvt {
  constructor(event = {}) {
    this.element = event.target || {};
  }

  getVal() {
    switch (this.element.type) {
      case 'checkbox':
        return this.element.checked;
      default:
        return this.element.value || '';
    }
  }
}

export default function formElementFromEvt(...args) {
  return new FormElementFromEvt(...args);
}
