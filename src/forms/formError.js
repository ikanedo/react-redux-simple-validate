import React from 'react';
import PropTypes from 'prop-types';
import { ERROR_MSG_CLASS_NAME } from './formConstants';

export default function FormError({ forInput, msg, className }) {
  return (
    <span className={`${ERROR_MSG_CLASS_NAME} ${ERROR_MSG_CLASS_NAME}--${forInput} ${className || ''}`}>
      {msg}
    </span>
  );
}

FormError.displayName = 'FormError';
FormError.propTypes = {
  forInput: PropTypes.string.isRequired,
  msg: PropTypes.string,
  className: PropTypes.string
};
