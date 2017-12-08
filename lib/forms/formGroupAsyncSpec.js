'use strict';

var _formGroupAsync = require('./formGroupAsync');

var _formGroupAsync2 = _interopRequireDefault(_formGroupAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FormGroupAsync', function () {
  describe('Use this if you have multiple form groups\n    AND you want to submit the form only WHEN all groups are valid', function () {
    var mockForm = void 0;
    beforeEach(function () {
      mockForm = {
        formName: 'addressForm',
        groups: ['personal', 'address']
      };
    });

    var formGroupAsync = void 0;
    beforeEach(function () {
      formGroupAsync = new _formGroupAsync2.default(mockForm);
    });

    describe('initialise', function () {
      it('SHOULD assign init props correctly', function () {
        expect(formGroupAsync.formName).toBe(mockForm.formName);
        expect(formGroupAsync.groups).toBeArrayOfStrings();
      });

      it('SHOULD init all the necessary public methods\n        (resolve, reject, getName, getNames, each, success, fail)\n        ', function () {
        expect(formGroupAsync.resolve).toBeFunction();
        expect(formGroupAsync.reject).toBeFunction();
        expect(formGroupAsync.getName).toBeFunction();
        expect(formGroupAsync.getNames).toBeFunction();
      });

      it('SHOULD generate all the resolve callbacks with the correct names', function () {
        expect(formGroupAsync.resolvers).toHaveMember(mockForm.formName + '-' + mockForm.groups[0]);
        expect(formGroupAsync.resolvers).toHaveMember(mockForm.formName + '-' + mockForm.groups[1]);
      });

      it('SHOULD generate all the reject callbacks with the correct names', function () {
        expect(formGroupAsync.rejecters).toHaveMember(mockForm.formName + '-' + mockForm.groups[0]);
        expect(formGroupAsync.rejecters).toHaveMember(mockForm.formName + '-' + mockForm.groups[1]);
      });

      it('SHOULD generate a memo for resolved promises', function () {
        expect(formGroupAsync.resolvedMemo).toBeEmptyObject();
      });
    });

    describe('Utility methods', function () {
      describe('getName - returns the name-spaced group name', function () {
        it('SHOULD return the "form name" + "group name" as a concatenated string', function () {
          expect(formGroupAsync.getName(mockForm.groups[0])).toBe(mockForm.formName + '-' + mockForm.groups[0]);
        });

        it('SHOULD throw an error if group name is not found', function () {
          expect(formGroupAsync.getName.bind(formGroupAsync, 'dummyGroup')).toThrowError();
        });
      });

      describe('getNames - returns an array of name-spaced group names', function () {
        it('SHOULD return an array of group name ("form name" + "group name")', function () {
          expect(formGroupAsync.getNames()).toBeArrayOfStrings();
        });
      });

      describe('each - iterates through each group and executes the given callback method', function () {
        it('SHOULD execute the given callback method', function () {
          var spyObj = { fn: function fn(n) {
              return n;
            } };
          spyOn(spyObj, 'fn');
          formGroupAsync.each(spyObj.fn);
          expect(spyObj.fn).toHaveBeenCalled();
        });
      });
    });

    describe('Handling promises', function () {
      it('SHOULD create an empty array to contain success/fail callback methods', function () {
        var resolvedAsync = new _formGroupAsync2.default({
          formName: 'addressForm',
          groups: ['personal', 'address']
        });

        expect(resolvedAsync.successCallbacks).toBeEmptyArray();
        expect(resolvedAsync.failCallbacks).toBeEmptyArray();
      });

      describe('WHEN a group is resolved', function () {
        it('SHOULD store the resolved data in a memo', function () {
          var mockPersonalDetails = { firstName: 'John' };
          var resolvedAsync = new _formGroupAsync2.default({
            formName: 'addressForm',
            groups: ['personal', 'address']
          });
          var groupName = resolvedAsync.getName(mockForm.groups[0]);

          resolvedAsync.resolve(mockPersonalDetails, groupName);

          expect(resolvedAsync.resolvedMemo[groupName]).toBeObject();
        });

        describe('AND resolved again', function () {
          it('SHOULD store the latest resolved data in the memo', function () {
            var resolvedAsync = new _formGroupAsync2.default({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            var groupName = resolvedAsync.getName(mockForm.groups[0]);

            // since we cannot call the done method after a private promise is resolved
            // assume the promise is resolved
            resolvedAsync.resolvers[groupName] = undefined;
            resolvedAsync.resolve({ firstName: 'Ben' }, groupName);
            expect(resolvedAsync.resolvedMemo[groupName].firstName).toBe('Ben');
          });
        });

        describe('AND rejected', function () {
          it('SHOULD remove the resolved data from the memo', function () {
            var resolvedAsync = new _formGroupAsync2.default({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            var groupName = resolvedAsync.getName(mockForm.groups[0]);

            // since we cannot call the done method after a private promise is resolved
            // assume the promise is resolved
            resolvedAsync.rejecters[groupName] = undefined;
            resolvedAsync.reject(['error msg'], groupName);
            expect(resolvedAsync.resolvedMemo[groupName]).toBeNull();
          });
        });

        describe('AND all groups are resolved', function () {
          it('SHOULD call success method with correct data', function (done) {
            var mockPersonalDetails = { firstName: 'John' };
            var mockDeliveryDetails = { line1: '123 Downing St.' };
            var resolvedAsync = new _formGroupAsync2.default({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });

            resolvedAsync.resolve(mockPersonalDetails, resolvedAsync.getName(mockForm.groups[0]));
            resolvedAsync.resolve(mockDeliveryDetails, resolvedAsync.getName(mockForm.groups[1]));

            resolvedAsync.then(function (formData) {
              expect(formData.firstName).toBe(mockPersonalDetails.firstName);
              expect(formData.line1).toBe(mockDeliveryDetails.line1);
              done();
            }).fail(function (err) {
              return done.fail('Error handler is called WHEN not intended | ' + err);
            });
          });
        });

        describe('AND another group is rejected', function () {
          var resolvedAsync = void 0;
          var resolvedGroup = void 0;
          beforeEach(function () {
            var mockPersonalDetails = { firstName: 'John' };
            resolvedAsync = new _formGroupAsync2.default({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            var groupName = resolvedAsync.getName(mockForm.groups[1]);
            resolvedAsync.rejecters[groupName] = function () {
              return null;
            };

            resolvedGroup = resolvedAsync.getName(mockForm.groups[0]);
            resolvedAsync.resolve(mockPersonalDetails, resolvedGroup);
            resolvedAsync.reject(['error msg'], resolvedAsync.getName(mockForm.groups[1])).fail(function () {
              return null;
            });
          });

          it('SHOULD remember the resolved promise', function () {
            // since we cannot call the done method after catch
            // assume the above beforeEach happened and the last THEN statement
            // is executed
            resolvedAsync.generatePromises();

            expect(resolvedAsync.resolvedMemo[resolvedGroup]).toHaveMember('firstName');
          });
        });
      });

      describe('WHEN a group is rejected', function () {
        it('SHOULD remove the group from the resolved memo', function (done) {
          var rejectedAsync = new _formGroupAsync2.default({
            formName: 'addressForm',
            groups: ['personal', 'address']
          });
          var groupName = rejectedAsync.getName(mockForm.groups[0]);

          rejectedAsync.reject(['error message'], groupName);

          rejectedAsync.fail(function (err) {
            expect(err).toBeArrayOfStrings();
            expect(rejectedAsync.resolvedMemo[groupName]).toBeNull();
            done();
          });
        });

        it('SHOULD call error method', function (done) {
          var rejectedAsync = new _formGroupAsync2.default({
            formName: 'addressForm',
            groups: ['personal', 'address']
          });

          rejectedAsync.reject(['error message'], rejectedAsync.getName(mockForm.groups[0]));

          rejectedAsync.then(function () {
            done.fail('Success handler is called WHEN not intended!');
          }).fail(function (err) {
            expect(err).toBeArrayOfStrings();
            done();
          });
        });
      });
    });
  });
});
//# sourceMappingURL=formGroupAsyncSpec.js.map