import validate from 'validate.js';
import './adapters/required';
import './adapters/minlength';
import './adapters/maxlength';
import './adapters/pattern';
import './adapters/equalTo';

function getMessage(msg) {
  if (typeof msg === 'function') {
    return msg;
  }

  return `^${msg}`;
}

function transformToObject(prev, current) {
  return Object.assign(prev, current);
}

function adaptRuleAndMsg(valRulesAndMsg, key) {
  return Object.keys(valRulesAndMsg.rules[key])
              .map((rule) => ({
                [rule]: {
                  [rule]: valRulesAndMsg.rules[key][rule],
                  message: getMessage(valRulesAndMsg.messages[key][rule])
                }
              }))
              .reduce(transformToObject, {});
}

function adaptConstraints(valRulesAndMsg) {
  return Object.keys(valRulesAndMsg.rules)
              .map((key) => ({ [key]: adaptRuleAndMsg(valRulesAndMsg, key) }))
              .reduce(transformToObject, {});
}

export default class Validate {
  constructor(valRulesAndMsg) {
    this.setConstraints(valRulesAndMsg);
  }

  setConstraints(valRulesAndMsg) {
    this.constraints = adaptConstraints(valRulesAndMsg);
  }

  validate(formData, constraints = this.constraints) {
    return validate(formData, constraints) || '';
  }

  single(key, formData, constraints = this.constraints) {
    const errorMsgs = validate(formData, { [key]: constraints[key] }) || {};
    return errorMsgs[key] || '';
  }
}
