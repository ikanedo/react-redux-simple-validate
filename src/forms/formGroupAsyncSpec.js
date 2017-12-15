import FormGroupAsync from './formGroupAsync';

describe('FormGroupAsync', () => {
  describe(
    `Use this if you have multiple form groups
    AND you want to submit the form only WHEN all groups are valid`
    , () => {
      let mockForm;
      beforeEach(() => {
        mockForm = {
          formName: 'addressForm',
          groups: ['personal', 'address']
        };
      });

      let formGroupAsync;
      beforeEach(() => {
        formGroupAsync = new FormGroupAsync(mockForm);
      });

      describe('initialise', () => {
        it('SHOULD assign init props correctly', () => {
          expect(formGroupAsync.formName).toBe(mockForm.formName);
          expect(formGroupAsync.groups).toBeArrayOfStrings();
        });

        it(`SHOULD init all the necessary public methods
        (resolve, reject, getName, getNames, each, success, fail)
        `, () => {
            expect(formGroupAsync.resolve).toBeFunction();
            expect(formGroupAsync.reject).toBeFunction();
            expect(formGroupAsync.getName).toBeFunction();
            expect(formGroupAsync.getNames).toBeFunction();
          });

        it('SHOULD generate all the resolve callbacks with the correct names', () => {
          expect(formGroupAsync.resolvers)
            .toHaveMember(`${mockForm.formName}-${mockForm.groups[0]}`);
          expect(formGroupAsync.resolvers)
            .toHaveMember(`${mockForm.formName}-${mockForm.groups[1]}`);
        });

        it('SHOULD generate all the reject callbacks with the correct names', () => {
          expect(formGroupAsync.rejecters)
            .toHaveMember(`${mockForm.formName}-${mockForm.groups[0]}`);
          expect(formGroupAsync.rejecters)
            .toHaveMember(`${mockForm.formName}-${mockForm.groups[1]}`);
        });

        it('SHOULD generate a memo for resolved promises', () => {
          expect(formGroupAsync.resolvedMemo).toBeEmptyObject();
        });
      });

      describe('Utility methods', () => {
        describe('getName - returns the name-spaced group name', () => {
          it('SHOULD return the "form name" + "group name" as a concatenated string', () => {
            expect(formGroupAsync.getName(mockForm.groups[0]))
              .toBe(`${mockForm.formName}-${mockForm.groups[0]}`);
          });

          it('SHOULD throw an error if group name is not found', () => {
            expect(formGroupAsync.getName.bind(formGroupAsync, 'dummyGroup')).toThrowError();
          });
        });

        describe('getNames - returns an array of name-spaced group names', () => {
          it('SHOULD return an array of group name ("form name" + "group name")', () => {
            expect(formGroupAsync.getNames()).toBeArrayOfStrings();
          });
        });

        describe('each - iterates through each group and executes the given callback method', () => {
          it('SHOULD execute the given callback method', () => {
            const spyObj = { fn: n => n };
            spyOn(spyObj, 'fn');
            formGroupAsync.each(spyObj.fn);
            expect(spyObj.fn).toHaveBeenCalled();
          });
        });

        describe('setGroups', () => {
          it('SHOULD set formGroups promises', () => {
            expect(formGroupAsync.groups).toEqual(jasmine.arrayContaining(['personal', 'address']));
            formGroupAsync.setGroups(['personal']);
            expect(formGroupAsync.groups).toEqual(jasmine.arrayContaining(['personal']));
            expect(formGroupAsync.groups).not.toEqual(jasmine.arrayContaining(['personal', 'address']));
          });

          it('SHOULD throw an error if not string', () => {
            expect(formGroupAsync.setGroups.bind(formGroupAsync, 'newGroup')).toThrowAnyError();
          });
        });

        describe('addGroup', () => {
          it('SHOULD add formGroup name', () => {
            expect(formGroupAsync.groups).toEqual(jasmine.arrayContaining(['personal', 'address']));
            formGroupAsync.addGroup('newGroup');
            expect(formGroupAsync.groups).toEqual(jasmine.arrayContaining(['personal', 'address', 'newGroup']));
          });

          it('SHOULD throw an error if not string', () => {
            expect(formGroupAsync.addGroup.bind(formGroupAsync, ['newGroup'])).toThrowAnyError();
          });
        });

        describe('removeGroup', () => {
          it('SHOULD set formGroups promises', () => {
            expect(formGroupAsync.groups).toEqual(jasmine.arrayContaining(['personal', 'address']));
            formGroupAsync.removeGroup('personal');
            expect(formGroupAsync.groups).not.toEqual(jasmine.arrayContaining(['personal']));
          });

          it('SHOULD throw an error if not string', () => {
            expect(formGroupAsync.removeGroup.bind(formGroupAsync, ['newGroup'])).toThrowAnyError();
          });

          it('SHOULD throw an error if not string', () => {
            expect(formGroupAsync.removeGroup.bind(formGroupAsync, 'newGroup')).toThrowAnyError();
            expect(formGroupAsync.removeGroup.bind(formGroupAsync, 'personal')).not.toThrowAnyError();
            expect(formGroupAsync.removeGroup.bind(formGroupAsync, 'newGroup', true)).not.toThrowAnyError();
          });
        });

        describe('then - success callback method', () => {
          describe('single call back only', () => {
            it('SHOULD call the last then method only', (done) => {
              const mockPersonalDetails = { firstName: 'John' };
              const mockDeliveryDetails = { line1: '123 Downing St.' };
              const resolvedAsync = new FormGroupAsync({
                formName: 'addressForm',
                groups: ['personal', 'address']
              });

              resolvedAsync.resolve(
                mockPersonalDetails,
                resolvedAsync.getName(mockForm.groups[0])
              );
              resolvedAsync.resolve(
                mockDeliveryDetails,
                resolvedAsync.getName(mockForm.groups[1])
              );

              resolvedAsync.then((formData) => {
                expect(formData.line1).toBe('THIS SHOULD NOT BE EXECUTED');
                done();
              }, true).then((formData) => {
                expect(formData.firstName).toBe(mockPersonalDetails.firstName);
                expect(formData.line1).toBe(mockDeliveryDetails.line1);
                done();
              }, true).fail(err => done.fail(`Error handler is called WHEN not intended | ${err}`));
            });
          });
        });
      });

      describe('fail - error callback method', () => {
        describe('single call back only', () => {
          it('SHOULD call the last fail method only', (done) => {
            const rejectedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            const groupName = rejectedAsync.getName(mockForm.groups[0]);

            rejectedAsync.reject(
              ['error message'],
              groupName
            );

            rejectedAsync.fail((err) => {
              expect(err).toBe('THIS SHOULD NOT BE EXECUTED');
              done();
            }).fail((err) => {
              expect(err).toBeArrayOfStrings();
              expect(rejectedAsync.resolvedMemo[groupName]).toBeNull();
              done();
            }, true);
          });
        });
      });

      describe('Handling promises', () => {
        it('SHOULD create an empty array to contain success/fail callback methods', () => {
          const resolvedAsync = new FormGroupAsync({
            formName: 'addressForm',
            groups: ['personal', 'address']
          });

          expect(resolvedAsync.successCallbacks).toBeEmptyArray();
          expect(resolvedAsync.failCallbacks).toBeEmptyArray();
        });

        describe('WHEN a group is resolved', () => {
          it('SHOULD store the resolved data in a memo', () => {
            const mockPersonalDetails = { firstName: 'John' };
            const resolvedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            const groupName = resolvedAsync.getName(mockForm.groups[0]);

            resolvedAsync.resolve(
              mockPersonalDetails,
              groupName
            );

            expect(resolvedAsync.resolvedMemo[groupName]).toBeObject();
          });

          describe('AND resolved again', () => {
            it('SHOULD store the latest resolved data in the memo', () => {
              const resolvedAsync = new FormGroupAsync({
                formName: 'addressForm',
                groups: ['personal', 'address']
              });
              const groupName = resolvedAsync.getName(mockForm.groups[0]);

              // since we cannot call the done method after a private promise is resolved
              // assume the promise is resolved
              resolvedAsync.resolvers[groupName] = undefined;
              resolvedAsync.resolve(
                { firstName: 'Ben' },
                groupName
              );
              expect(resolvedAsync.resolvedMemo[groupName].firstName).toBe('Ben');
            });
          });

          describe('AND rejected', () => {
            it('SHOULD remove the resolved data from the memo', () => {
              const resolvedAsync = new FormGroupAsync({
                formName: 'addressForm',
                groups: ['personal', 'address']
              });
              const groupName = resolvedAsync.getName(mockForm.groups[0]);

              // since we cannot call the done method after a private promise is resolved
              // assume the promise is resolved
              resolvedAsync.rejecters[groupName] = undefined;
              resolvedAsync.reject(
                ['error msg'],
                groupName
              );
              expect(resolvedAsync.resolvedMemo[groupName]).toBeNull();
            });
          });

          describe('AND all groups are resolved', () => {
            it('SHOULD call success method with correct data', (done) => {
              const mockPersonalDetails = { firstName: 'John' };
              const mockDeliveryDetails = { line1: '123 Downing St.' };
              const resolvedAsync = new FormGroupAsync({
                formName: 'addressForm',
                groups: ['personal', 'address']
              });

              resolvedAsync.resolve(
                mockPersonalDetails,
                resolvedAsync.getName(mockForm.groups[0])
              );
              resolvedAsync.resolve(
                mockDeliveryDetails,
                resolvedAsync.getName(mockForm.groups[1])
              );

              resolvedAsync.then((formData) => {
                expect(formData.firstName).toBe(mockPersonalDetails.firstName);
                expect(formData.line1).toBe(mockDeliveryDetails.line1);
                done();
              }).fail(err => done.fail(`Error handler is called WHEN not intended | ${err}`));
            });
          });

          describe('AND another group is rejected', () => {
            let resolvedAsync;
            let resolvedGroup;
            beforeEach(() => {
              const mockPersonalDetails = { firstName: 'John' };
              resolvedAsync = new FormGroupAsync({
                formName: 'addressForm',
                groups: ['personal', 'address']
              });
              const groupName = resolvedAsync.getName(mockForm.groups[1]);
              resolvedAsync.rejecters[groupName] = () => null;

              resolvedGroup = resolvedAsync.getName(mockForm.groups[0]);
              resolvedAsync.resolve(
                mockPersonalDetails,
                resolvedGroup
              );
              resolvedAsync.reject(
                ['error msg'],
                resolvedAsync.getName(mockForm.groups[1])
              ).fail(() => null);
            });

            it('SHOULD remember the resolved promise', () => {
            // since we cannot call the done method after catch
            // assume the above beforeEach happened and the last THEN statement
            // is executed
              resolvedAsync.generatePromises();

              expect(resolvedAsync.resolvedMemo[resolvedGroup]).toHaveMember('firstName');
            });
          });
        });

        describe('WHEN a group is rejected', () => {
          it('SHOULD remove the group from the resolved memo', (done) => {
            const rejectedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            const groupName = rejectedAsync.getName(mockForm.groups[0]);

            rejectedAsync.reject(
              ['error message'],
              groupName
            );

            rejectedAsync.fail((err) => {
              expect(err).toBeArrayOfStrings();
              expect(rejectedAsync.resolvedMemo[groupName]).toBeNull();
              done();
            });
          });

          it('SHOULD call error method', (done) => {
            const rejectedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });

            rejectedAsync.reject(
              ['error message'],
              rejectedAsync.getName(mockForm.groups[0])
            );

            rejectedAsync
              .then(() => {
                done.fail('Success handler is called WHEN not intended!');
              })
              .fail((err) => {
                expect(err).toBeArrayOfStrings();
                done();
              });
          });
        });
      });
    }
  );
});
