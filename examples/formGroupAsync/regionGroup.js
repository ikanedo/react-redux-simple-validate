import React, { Component } from 'react';
import { FormGroup, FormError } from 'react-redux-simple-validate';

export default class state extends Component {
  constructor(props) {
    super(props);

    this.toggleFreeText = this.toggleFreeText.bind(this);
    this.state = {
      isFreeText: true
    };
  }

  toggleFreeText() {
    this.props.resetRegion();
    this.setState({
      isFreeText: !this.state.isFreeText
    });
  }

  render() {
    const {
      formGroups,
      validation
    } = this.props;

    return (
      <fieldset>
        <label htmlFor="toggleState">
          <input type="checkbox" id="toggleState" onChange={this.toggleFreeText} /> toggle state
        </label>
        <FormGroup
          formName={formGroups.getName('region')}
          handleValidForm={formGroups.resolve}
          handleInvalidForm={formGroups.reject}
          validation={validation}
        >
          <div className="form-input">
            <label htmlFor="region">Region</label>
            {this.state.isFreeText
              ? <input name="region" type="text" id="region" value="" />
              : (
                <select name="region">
                  <option value="">Please select your state</option>
                  <option value="AL">Alaska</option>
                  <option value="CA">California</option>
                </select>
              )
            }
            <FormError forInput="region" />
          </div>
        </FormGroup>
      </fieldset>
    );
  }
}
