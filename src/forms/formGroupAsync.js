import { includes } from './formUtils';

function flattenObj(obj) {
  return Object.keys(obj)
    .map(key => obj[key])
    .reduce((prev, current) => Object.assign({}, prev, current), {});
}

export default class FormGroupAsync {
  constructor({ formName, groups }) {
    this.formName = formName;
    this.groups = [...groups];

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.generatePromises = this.generatePromises.bind(this);
    this.setGroups = this.setGroups.bind(this);

    this.successCallbacks = [];
    this.failCallbacks = [];

    this.resolvedMemo = {};
    this.generatePromises();
  }

  setGroups(groups) {
    if (!Array.isArray(groups)) {
      throw new Error(`${groups} - Group name is expected to be a string`);
    }

    this.groups = groups;
    this.generatePromises();
  }

  addGroup(groupKeyToAdd) {
    if (typeof groupKeyToAdd !== 'string') {
      throw new Error(`${groupKeyToAdd} - Group name is expected to be a string`);
    }

    this.groups = [
      ...this.groups,
      groupKeyToAdd
    ];
    this.generatePromises();
  }

  removeGroup(groupKeyToRemove, isForceRemove) {
    if (typeof groupKeyToRemove !== 'string') {
      throw new Error(`${groupKeyToRemove} - Group name is expected to be a string`);
    }

    const hasGroupKey = this.groups.filter(group => group === groupKeyToRemove)[0];
    if (!hasGroupKey && !isForceRemove) {
      throw new Error(`${groupKeyToRemove} - Group to remove is not found. Did you mispell it?`);
    }

    this.groups = this.groups.filter(group => group !== groupKeyToRemove);
    this.generatePromises();
  }

  generatePromises() {
    this.successCallbacks = [];
    this.failCallbacks = [];

    this.resolvers = {};
    this.rejecters = {};
    this.handlePromises(this.getNames().map((groupName) => {
      if (this.resolvedMemo[groupName]) {
        return Promise.resolve(this.resolvedMemo[groupName]);
      }

      return new Promise((resolve, reject) => {
        this.resolvers[groupName] = resolve;
        this.rejecters[groupName] = reject;
      });
    }));
  }

  handlePromises(promises) {
    Promise
      .all(promises)
      .then(() => {
        /* istanbul ignore next */
        if (this.successCallbacks[0]) {
          this.successCallbacks.forEach(fn => fn(flattenObj(this.resolvedMemo)));
        }

        this.resolvedMemo = {};
      })
      .catch((err) => {
        /* istanbul ignore next */
        if (this.failCallbacks[0]) {
          this.failCallbacks.forEach(fn => fn(err));
        }
      })
      .then(this.generatePromises);
  }

  resolve(groupData, groupName) {
    if (this.resolvers[groupName]) {
      this.resolvers[groupName](groupData);
    }

    this.resolvedMemo[groupName] = groupData;
    return this;
  }

  reject(errorMsgs, groupName) {
    if (this.rejecters[groupName]) {
      this.rejecters[groupName](errorMsgs);
    }

    this.resolvedMemo[groupName] = null;
    return this;
  }

  getName(key) {
    if (!(includes(this.groups, key))) {
      throw new Error(`${key} group is not found in ${this.formName} groups. Did you mispell it?`);
    }

    return `${this.formName}-${key}`;
  }

  getNames() {
    return this.groups.map(group => this.getName(group));
  }

  each(cb) {
    this.getNames().forEach(cb);
    return this;
  }

  // use single callback if you want to override the previous success callback instead of executing all
  then(fn, isSingleCallback = false) {
    if (isSingleCallback) {
      this.successCallbacks = [fn.bind(this)];
    } else {
      this.successCallbacks.push(fn.bind(this));
    }

    return this;
  }

  fail(fn, isSingleCallback = false) {
    if (isSingleCallback) {
      this.failCallbacks = [fn.bind(this)];
    } else {
      this.failCallbacks.push(fn.bind(this));
    }

    return this;
  }
}
