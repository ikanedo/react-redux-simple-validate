import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import { isAReactEl, isAFormEl, isAFormGroup } from './formUtils';
import { ERROR_INPUT_CLASS_NAME, HAS_VALUE_CLASS_NAME } from './formConstants';
import { getFormElementRefName } from './formElement/formElementUtils';
import formElementFromState from './formElement/formElementFromState';

function isLikeStringOrNum(element) {
  return !isAReactEl(element);
}

function isAnErrorEl({ type }) {
  return type.displayName === 'FormError';
}

function getErrorMsg(name, errors) {
  return (errors[name] || [])[0];
}

function getErrorElProps(element, { errors }) {
  const { forInput } = element.props;
  return {
    ...element.props,
    msg: getErrorMsg(forInput, errors)
  };
}

function mergeCallbacks(...args) {
  return (e) => {
    args.filter(arg => isFunction(arg))
      .forEach(cb => cb(e));
  };
}

function getHasValueClassName(formElementValue) {
  const element = formElementValue || {};
  return isEmpty(element.value) ? '' : HAS_VALUE_CLASS_NAME;
}

function getErrorInputClassName(name, errors) {
  const hasErrors = !!getErrorMsg(name, errors);
  return hasErrors ? ERROR_INPUT_CLASS_NAME : '';
}

function getFormElProps(element, { errors, values, onValidate, onValueChange }) {
  const {
    name,
    onChange,
    onBlur,
    className
  } = element.props;
  const formElementValue = formElementFromState(element, values).getKeyVal();

  if (isEmpty(name)) {
    throw new Error(`${element.type} element is missing a name attribute!`, element);
  }

  return {
    ...element.props,
    key: name,
    ref: getFormElementRefName(element),
    onChange: mergeCallbacks(onValueChange, onChange),
    onBlur: mergeCallbacks(onValidate, onBlur),
    className: [
      className,
      getErrorInputClassName(name, errors),
      getHasValueClassName(formElementValue)
    ].join(' '),
    ...formElementValue
  };
}

function getElProps(element, args) {
  if (isAFormEl(element)) {
    return getFormElProps(element, args);
  }

  if (isAnErrorEl(element)) {
    return getErrorElProps(element, args);
  }

  return element.props;
}

function getChildren(childrenProp, recurFormBuilder) {
  if (isAReactEl(childrenProp)) {
    return recurFormBuilder();
  }

  return childrenProp;
}

export default function formBuilder(args) {
  return React.Children.map(args.children, (element) => {
    if (isLikeStringOrNum(element) || isAFormGroup(element)) {
      return element;
    }

    const { children } = element.props;
    const elementProps = getElProps(element, args);
    const elementChildren = getChildren(
      children,
      formBuilder.bind(null, { ...args, children })
    );

    return [React.cloneElement(
      element,
      elementProps,
      elementChildren
    )];
  });
}
