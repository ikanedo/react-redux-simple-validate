import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as FormActions from './formActions';
import FormGroup from './formGroup';

export class Form extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      triggerValidate,
      formName
    } = this.props;

    triggerValidate(formName);
  }

  render() {
    const {
      children,
      className,
      ...otherProps
    } = this.props;
    return (
      <form onSubmit={this.onSubmit} className={className} noValidate>
        <FormGroup {...otherProps}>{children}</FormGroup>
      </form>
    );
  }
}

// Form.propTypes = {
//   className: PropTypes.string,
//   formName: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   triggerValidate: PropTypes.func.isRequired
// };

export default connect(null, FormActions)(Form);
