'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormInputType = getFormInputType;
exports.getFormElementType = getFormElementType;
exports.getFormElementRefName = getFormElementRefName;
function getFormInputType(type) {
  switch (type) {
    case 'radio':
    case 'checkbox':
      return type;
    default:
      return 'default';
  }
}

function getFormElementType(element) {
  switch (element.type) {
    case 'select':
      return element.type;
    case 'textarea':
    case 'input':
      return getFormInputType(element.props.type);
    default:
      return 'notype';
  }
}

function getFormElementRefName(element) {
  var _element$props = element.props,
      name = _element$props.name,
      value = _element$props.value;

  if (getFormElementType(element) === 'radio') {
    return name + value;
  }

  return name;
}
//# sourceMappingURL=formElementUtils.js.map