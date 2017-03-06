export function getFormInputType(type) {
  switch (type) {
    case 'radio':
    case 'checkbox':
      return type;
    default:
      return 'default';
  }
}

export function getFormElementType(element) {
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

export function getFormElementRefName(element) {
  const { name, value } = element.props;
  if (getFormElementType(element) === 'radio') {
    return name + value;
  }

  return name;
}
