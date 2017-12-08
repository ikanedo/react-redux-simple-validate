import React from 'react';
import validate from 'validate.js';
import { isAReactEl, isAFormEl, isAFormGroup } from './formUtils';
import { ERROR_INPUT_CLASS_NAME, HAS_VALUE_CLASS_NAME } from './formConstants';
import { getFormElementRefName } from './formElement/formElementUtils';
import formElementFromState from './formElement/formElementFromState';
import formElementFromEvt from './formElement/formElementFromEvt';

function isLikeStringOrNum(element) {
  return !isAReactEl(element);
}

function isAnErrorEl({ type }) {
  return type.displayName === 'FormError';
}

function isAFormErrorElClass({ props }) {
  return !!props['data-form-error'] || !!props.htmlFor;
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

function getErrorClassElProps(element, { errors }) {
  const inputName = element.props['data-form-error'] || element.props.htmlFor;
  const errorClassName = getErrorMsg(inputName, errors) ? ERROR_INPUT_CLASS_NAME : '';

  return {
    ...element.props,
    className: `${element.props.className} ${errorClassName}`
  };
}

function mergeCallbacks(...args) {
  return (e) => {
    args.filter(arg => validate.isFunction(arg))
      .forEach(cb => cb(e));
  };
}

function getHasValueClassName(formElementValue) {
  const element = formElementValue || {};
  return validate.isEmpty(element.value) ? '' : HAS_VALUE_CLASS_NAME;
}

function getErrorInputClassName(name, errors) {
  const hasErrors = !!getErrorMsg(name, errors);
  return hasErrors ? ERROR_INPUT_CLASS_NAME : '';
}

function getValidateEvents(eventType, formGroupProps) {
  const {
    onValidate,
    onInvalidate,
    invalidateEvent,
    validateEvent
  } = formGroupProps;

  if (
    invalidateEvent === eventType
    && validateEvent === eventType
  ) {
    return (...args) => {
      onInvalidate(...args);
      onValidate(...args);
    };
  }

  if (invalidateEvent === eventType) {
    return onInvalidate;
  }

  if (validateEvent === eventType) {
    return onValidate;
  }

  return null;
}

let lastFocusValue = null;
function getLastFocusValue(e) {
  lastFocusValue = formElementFromEvt(e).getVal();
}

function getFormElProps(element, formGroupProps) {
  const {
    name,
    onChange,
    onBlur,
    onFocus,
    className
  } = element.props;

  const {
    errors,
    values,
    onValueChange,
    stringRefs
  } = formGroupProps;

  const formElementValue = formElementFromState(element, values).getKeyVal();

  if (validate.isEmpty(name)) {
    throw new Error(`${element.type} element is missing a name attribute!`, element);
  }

  const onChangeEvents = mergeCallbacks(onValueChange, onChange, getValidateEvents('onChange', formGroupProps));
  const onFocusEvents = mergeCallbacks(onFocus, getLastFocusValue, getValidateEvents('onFocus', formGroupProps));
  const onBlurEvents = mergeCallbacks(onBlur, getValidateEvents('onBlur', formGroupProps));

  return {
    ...element.props,
    key: name,
    ref(node) {
      stringRefs[getFormElementRefName(element)] = node;
    },
    onChange: onChangeEvents,
    onFocus: onFocusEvents,
    onBlur: (e) => {
      const hasTheValueChanged = formElementFromEvt(e).getVal() !== lastFocusValue;
      if (hasTheValueChanged) {
        onBlurEvents(e);
      }
    },
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

  if (isAFormErrorElClass(element)) {
    return getErrorClassElProps(element, args);
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
