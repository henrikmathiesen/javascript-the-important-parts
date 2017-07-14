describe('ES6 promises', () => {

    describe('first, lets look at callbacks', () => {

        const loadSomething = (successCb, errorCb) => {
            const ok = true;
            const data = { message: 'it works' };

            if (ok) {
                successCb(data);
            }
            else {
                errorCb(new Error('it failed'));
            }
        };

        const loadSomethingElse = (successCb, errorCb) => {
            const ok = true;
            const data = { message: 'it works' };

            if (ok) {
                successCb(data);
            }
            else {
                errorCb(new Error('it failed'));
            }
        };

        it('should see that with callbacks, we get this kind of messy code that points to the right', done => {
            loadSomething((data) => {
                expect(data.message).toEqual('it works');
                loadSomethingElse((data) => {
                    expect(data.message).toEqual('it works');
                    done();
                }, (error) => {
                    // console.log(error);
                    expect(error.message).toEqual('it failed');
                    done();
                });
            }, (error) => {
                // console.log(error);
                expect(error.message).toEqual('it failed');
                done();
            });
        });

        it('should see that this is a little nicer though, but still messy (we handle error for every call for example)', done => {
            const loadSomethingSuccess = (data) => {
                expect(data.message).toEqual('it works');
                loadSomethingElse(loadSomethingElseSuccess, loadSomethingElseError);
            };

            const loadSomethingElseSuccess = (data) => {
                expect(data.message).toEqual('it works');
                done();
            };

            const loadSomethingError = (error) => {
                // console.log(error.message);
                expect(error.message).toEqual('it failed');
                done();
            };

            const loadSomethingElseError = (error) => {
                // console.log(error.message);
                expect(error.message).toEqual('it failed');
                done();
            };

            loadSomething(loadSomethingSuccess, loadSomethingError);
        });
    });

    describe('then, we look at ES6 promises', () => {

        const loadSomething = () => {
            return new Promise((resolve, reject) => {
                const ok = true;
                const data = { message: 'it works' };

                if (ok) {
                    resolve(data);
                }
                else {
                    reject(new Error('it failed'));
                }
            });
        };

        const loadSomethingElse = () => {
            return new Promise((resolve, reject) => {
                const ok = true;
                const data = { message: 'it works' };

                if (ok) {
                    resolve(data);
                }
                else {
                    reject(new Error('it failed'));
                }
            });
        };

        it('should see that this is a nicer syntax', () => {
            // cant actually run this in a unit test

            // loadSomething
            //     .then((data) => { 
            //         // got the data
            //         return loadSomethingElse(); , I dont think we need to return it if we are not dependant of its data in the next .then()
            //     })
            //     .then((data) => {
            //         // got the data
            //     })
            //     .catch((error) => {
            //         // console.log(error.message);
            //         // one error handler for two async functions
            //     })

            // can only do it like this
            expect.assertions(1);
            expect(loadSomething()).resolves.toEqual({ message: 'it works' });
        });

        it('runs in parallell!', () => {
            // cant actually run this in a unit test

            // Promise.all([loadSomething(), loadSomethingElse()])
            //     .then((dataCollection) => { 
            //         // got data from both methods
            //     })
            //     .catch((error) => { 
            //         // console.log(error.message);
            //         // one error handler for two async functions
            //     });

            // we can do this instead

            const promiseAll = () => {
                return Promise.all([
                    loadSomething(),
                    loadSomethingElse()
                ])
            };

            expect.assertions(1);
            expect(promiseAll()).resolves.toEqual([{ message: 'it works' }, { message: 'it works' }]);
        });
    });

});
