describe('functions', () => {

    describe('function decleration (or statement)', () => {
        it(`must have a name, optionaly takes parameters (but calling it with no arguments is fine, parameters will then be undefined in function body), 
            will return undefined by default, and is hoisted to the top so we can call it before the decleration`, () => {
                expect(name).toBeDefined();
                expect(name()).not.toBeDefined();

                function name(x, y) {
                    // ...
                }
            });

        it('has a special arguments object', () => {
            function name() {
                return arguments[0];
            }

            expect(name('foo')).toEqual('foo');
        });

        it('is a sort of an object and inherits properties and methods from Function.prototype', () => {
            function bar() {

            }

            expect(bar.name).toEqual('bar');
            expect(bar.bind).toBeDefined();
            expect(typeof bar === 'object').toEqual(false); // sort of an object ...
        });

        it('can refer to itself via its name', () => {
            function baz() {
                return baz.toString();
            }

            expect(baz().indexOf('return baz.toString();')).not.toEqual(-1);
        });

        // Do not declare functions within if statements, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
    });

    describe('function expression', () => {
        it('must not have a name and is not hoisted', () => {
            const name = function (x, y) {

            };

            expect(name).toBeDefined();
            expect(name()).not.toBeDefined();
        });

        it('will get the variables name if not givven a name and can refer to itself via its name', () => {
            const baz = function () {
                return baz.toString();
            };

            expect(baz().indexOf('return baz.toString();')).not.toEqual(-1);
        });

        it('can have a name, and name will not change if function is assigned to another variable', () => {
            const foo = function foo() {
                return foo.toString();
            }

            expect(foo().indexOf('return foo.toString();')).not.toEqual(-1);

            const bar = foo;

            expect(foo().indexOf('return foo.toString();')).not.toEqual(-1);
            expect(bar().indexOf('return foo.toString();')).not.toEqual(-1);
        });

        it('has a special arguments object', () => {
            const name = function () {
                return arguments[0];
            }

            expect(name('foo')).toEqual('foo');
        });

        it('is a sort of an object and inherits properties and methods from Function.prototype', () => {
            const bar = function () {

            }

            expect(bar.name).toEqual('bar');
            expect(bar.bind).toBeDefined();
            expect(typeof bar === 'object').toEqual(false); // sort of an object ...
        });

        // function expressions are ok to declare inside if statements, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
    });

    describe('arrow functions has a shortes syntax than function expressions and does not bind its own this, they cannot be used as constructors', () => {
        it('can not have a name and is not hoisted', () => {
            const name = (x, y) => {

            }

            expect(name).toBeDefined();
            expect(name()).not.toBeDefined();
        });

        it('will get the variables name and can refer to itself via its name', () => {
            const baz = () => {
                return baz.toString();
            };

            expect(baz().indexOf('return baz.toString();')).not.toEqual(-1);
        });

        it('name will not change if function is assigned to another variable', () => {
            const foo = () => {
                return foo.toString();
            }

            expect(foo().indexOf('return foo.toString();')).not.toEqual(-1);

            const bar = foo;

            expect(foo().indexOf('return foo.toString();')).not.toEqual(-1);
            expect(bar().indexOf('return foo.toString();')).not.toEqual(-1);
        });

        it('has not a special arguments object', () => {
            const name = () => {
                return arguments[0];
            }

            expect(name('foo')).not.toEqual('foo');
        });

        it('is a sort of an object and inherits properties and methods from Function.prototype', () => {
            const bar = () => {

            }

            expect(bar.name).toEqual('bar');
            expect(bar.bind).toBeDefined();
            expect(typeof bar === 'object').toEqual(false); // sort of an object ...
        });

        describe('Parentheses and auto return', () => {
            it('should know that arrow functions can be written in a very short form, and in this form does an auto returns', () => {
                const foo = n => n + 2;
                expect(foo(2)).toEqual(4);
            });

            it('should know that if several parameters are recieved then there must be parentheses', () => {
                const foo = (x, y) => x + y;
                expect(foo(1, 1)).toEqual(2);
            });

            it('should know that if no parameters are recieved then there must be parentheses', () => {
                const foo = () => 'ok';
                expect(foo()).toEqual('ok');
            });

            it('should know that if curly braces are provided then function will not auto return', () => {
                const bar = x => { x + 1 };
                expect(bar(1)).toEqual(undefined);
            });

            it('should be aware of that if we want to return an object we can then wrap it in parentheses', () => {
                const baz = () => ({ name: 'Adam' });
                expect(baz()).toEqual({ name: 'Adam' });
            });
        });

        describe('the this pointer', () => {
            it('should know that in this case, this points to the global object (window in a browser)', () => {
                function foo() {
                    return this;
                }

                expect(foo()).not.toBe(foo);
                expect(foo()).not.toEqual(undefined);
            });

            it('should know that in this case, this would be undefined', () => {
                'use strict';

                function foo() {
                    return this;
                }

                expect(foo()).toEqual(undefined);
            });

            it('should know that in this case, this points to the global object (window in a browser)', () => {
                const foo = function () {
                    return this;
                }

                expect(foo()).not.toBe(foo);
                expect(foo()).not.toEqual(undefined);
            });

            it('should know that in this case, this would be undefined', () => {
                'use strict';

                const foo = function () {
                    return this;
                }

                expect(foo()).toEqual(undefined);
            });

            it('should know that in this case, this points to the object', () => {
                function Bar() {
                    this.name = 'foo';
                };

                const bar = new Bar();
                expect(bar.name).toEqual('foo');
            });

            it('should know that in this case, this points to the object', () => {
                const Bar = function () {
                    this.name = 'foo';
                };

                const bar = new Bar();
                expect(bar.name).toEqual('foo');
            });

            it('should know that in this case (object method), this points to the object', () => {
                const baz = {
                    func: function () {
                        return this.func.toString();
                    }
                };

                expect(baz.func().indexOf('return this.func.toString();')).not.toEqual(-1);
            });

            it('should know that in this case, this again points to global object', done => {
                const work = function (doneCb) {
                    // ...
                    doneCb();
                }

                const bar = {
                    num: 0,
                    func: function () {
                        work(function () {
                            const times = this.num + 1;
                            expect(times).not.toEqual(1);
                            done();
                        });
                    }
                };

                bar.func();
            });

            it('should know that using an arrow function makes this point to the object', done => {
                const work = function (doneCb) {
                    // ...
                    doneCb();
                }

                const bar = {
                    num: 0,
                    func: function () {
                        work(() => {
                            const times = this.num + 1;
                            expect(times).toEqual(1);
                            done();
                        });
                    }
                };

                bar.func();
            });

            it('should know that using an arrow function like this makes this point to an empty object', () => {
                const bar = {
                    num: 0,
                    func: () => {
                        return this;
                    }
                };

                expect(bar.func()).toEqual({});
            });

            it('should know that bind this is ignored for arrow functions', () => {
                const bar = {
                    num: 0,
                    func: () => {
                        return this;
                    }
                };

                expect(bar.func.bind(bar)()).toEqual({});
            });

            it('should also recap bind, rebind this (null does nothing?), can send arguments, returns a new function', () => {
                function func(name) {
                    return name;
                }

                expect(func.bind(null, 'adam')()).toEqual('adam');
                expect(func.bind(null)('adam')).toEqual('adam');
            });

            /*
                # Regarding call and apply
                    Note: While the syntax of this function is almost identical to that of apply(), 
                    the fundamental difference is that call() accepts an argument list, while apply() 
                    accepts a single array of arguments.
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
            */


            // strict mode rules with regard to this are ignored for arrow functions
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

        });


        // Arrow function expressions are best suited for non-method functions (see bellow also), and they cannot be used as constructors,
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    });

    describe('function vs method', () => {

    });

    describe('IIFE (Immediately Invoked Function Expression)', () => {
        it('can be done like this', () => {
            let check = 0;
            
            (function (n) { 
                check = n;
            })(1);

            expect(check).toEqual(1);
        });
    });

});
