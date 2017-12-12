'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formUtils = require('./formUtils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function flattenObj(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  }).reduce(function (prev, current) {
    return Object.assign({}, prev, current);
  }, {});
}

var FormGroupAsync = function () {
  function FormGroupAsync(_ref) {
    var formName = _ref.formName,
        groups = _ref.groups;

    _classCallCheck(this, FormGroupAsync);

    this.formName = formName;
    this.groups = [].concat(_toConsumableArray(groups));

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.generatePromises = this.generatePromises.bind(this);

    this.successCallbacks = [];
    this.failCallbacks = [];

    this.resolvedMemo = {};
    this.generatePromises();
  }

  _createClass(FormGroupAsync, [{
    key: 'generatePromises',
    value: function generatePromises() {
      var _this = this;

      this.successCallbacks = [];
      this.failCallbacks = [];

      this.resolvers = {};
      this.rejecters = {};
      this.handlePromises(this.getNames().map(function (groupName) {
        if (_this.resolvedMemo[groupName]) {
          return Promise.resolve(_this.resolvedMemo[groupName]);
        }

        return new Promise(function (resolve, reject) {
          _this.resolvers[groupName] = resolve;
          _this.rejecters[groupName] = reject;
        });
      }));
    }
  }, {
    key: 'handlePromises',
    value: function handlePromises(promises) {
      var _this2 = this;

      Promise.all(promises).then(function () {
        /* istanbul ignore next */
        if (_this2.successCallbacks[0]) {
          _this2.successCallbacks.forEach(function (fn) {
            return fn(flattenObj(_this2.resolvedMemo));
          });
        } else {
          console.warn('No success callback specified');
        }

        _this2.resolvedMemo = {};
      }).catch(function (err) {
        /* istanbul ignore next */
        if (_this2.failCallbacks[0]) {
          _this2.failCallbacks.forEach(function (fn) {
            return fn(err);
          });
        } else {
          console.warn('No fail callback specified');
        }
      }).then(this.generatePromises);
    }
  }, {
    key: 'resolve',
    value: function resolve(groupData, groupName) {
      if (this.resolvers[groupName]) {
        this.resolvers[groupName](groupData);
      }

      this.resolvedMemo[groupName] = groupData;
      return this;
    }
  }, {
    key: 'reject',
    value: function reject(errorMsgs, groupName) {
      if (this.rejecters[groupName]) {
        this.rejecters[groupName](errorMsgs);
      }

      this.resolvedMemo[groupName] = null;
      return this;
    }
  }, {
    key: 'getName',
    value: function getName(key) {
      if (!(0, _formUtils.includes)(this.groups, key)) {
        throw new Error(key + ' group is not found in ' + this.formName + ' groups. Did you mispell it?');
      }

      return this.formName + '-' + key;
    }
  }, {
    key: 'getNames',
    value: function getNames() {
      var _this3 = this;

      return this.groups.map(function (group) {
        return _this3.getName(group);
      });
    }
  }, {
    key: 'each',
    value: function each(cb) {
      this.getNames().forEach(cb);
      return this;
    }

    // use single callback if you want to override the previous success callback instead of executing all

  }, {
    key: 'then',
    value: function then(fn) {
      var isSingleCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (isSingleCallback) {
        this.successCallbacks = [fn.bind(this)];
      } else {
        this.successCallbacks.push(fn.bind(this));
      }

      return this;
    }
  }, {
    key: 'fail',
    value: function fail(fn) {
      var isSingleCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (isSingleCallback) {
        this.failCallbacks = [fn.bind(this)];
      } else {
        this.failCallbacks.push(fn.bind(this));
      }

      return this;
    }
  }]);

  return FormGroupAsync;
}();

exports.default = FormGroupAsync;
//# sourceMappingURL=formGroupAsync.js.map