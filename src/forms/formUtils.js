import React from 'react';
import formElementFromReact from './formElement/formElementFromReact';

export function includes(array, val) {
  return array.indexOf(val) > -1;
}

export function pick(obj, keys) {
  return Object.keys(obj)
    .filter(key => includes(keys, key))
    .map(key => ({ [key]: obj[key] }))
    .reduce((prev, curr) => Object.assign(prev, curr), {});
}

export function omit(obj, keys) {
  return Object.keys(obj)
    .filter(key => !includes(keys, key))
    .map(key => ({ [key]: obj[key] }))
    .reduce((prev, curr) => Object.assign(prev, curr), {});
}

export function isAReactEl(el = '') {
  return !!(React.Children.toArray(el).filter(child => React.isValidElement(child))[0]);
}

export function isAFormEl({ type }) {
  return includes([
    'input', 'textarea', 'select'
  ], type);
}

export function isAFormGroup({ type }) {
  if (typeof type === 'function' && type.name === 'Connect') {
    return type.WrappedComponent.displayName === 'FormGroup';
  }

  return false;
}

export function getFormElementNames(children) {
  return React.Children.map(children, (element) => {
    if (!isAReactEl(element)) {
      return null;
    }

    if (isAFormEl(element)) {
      return element.props.name;
    }

    if (isAReactEl(element.props.children)) {
      return getFormElementNames(element.props.children);
    }

    return null;
  });
}

export function getFormData(children, refs) {
  return React.Children.map(children, (element) => {
    if (!isAReactEl(element)) {
      return null;
    }

    if (isAFormEl(element)) {
      return formElementFromReact(element, refs).getKeyVal();
    }

    if (isAReactEl(element.props.children)) {
      return getFormData(element.props.children, refs);
    }

    return null;
  }).reduce((prev, current) => Object.assign({}, prev, current), {});
}

export function pickValidation({ rules, messages, helpers = {} }, keys) {
  return {
    rules: pick(rules, keys),
    messages: pick(messages, keys),
    helpers: pick(helpers, keys)
  };
}

export function omitValidation({ rules, messages, helpers = {} }, keys) {
  return {
    rules: omit(rules, keys),
    messages: omit(messages, keys),
    helpers: omit(helpers, keys)
  };
}

export function filterValidation({ validation, children }) {
  return pickValidation(validation, getFormElementNames(children));
}
