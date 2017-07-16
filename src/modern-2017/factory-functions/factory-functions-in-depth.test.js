describe('Factory functions in depth - as a replacement for ES6 classes', () => {

    /*
        A Factory Function is just a Function that creates something. 
        It is usually an Object, but it can be anything, a string, an Array, or another Function.
        The convention for Factory Functions is to capitalize the name.
    */

    it('should get a feel for it - this is how I used to write it', () => {
        const Greeter = () => {
            const _privateMember = 'foo';
            const factory = {};

            factory.greet = () => {
                return 'Hello World!';
            };

            return factory;
        };

        const greeter01 = Greeter();
        const greeter02 = Greeter();

        // we have created two different greeter objects
        expect(greeter01).not.toBe(greeter02);
    });

    it('should get a feel for it - it can also be written like this (notice object method)', () => {
        const Greeter = (message) => {
            const _message = message || 'Hello World!';

            return {
                greet() {
                    return _message;
                }
            }
        };

        const greeter01 = Greeter();
        const greeter02 = Greeter('Foo!');

        // we have created two different greeter objects
        expect(greeter01).not.toBe(greeter02);
        expect(greeter01.greet()).toEqual('Hello World!');
        expect(greeter02.greet()).toEqual('Foo!');
    });

    describe('Dependency Injection', () => {
        it('should be able to greet using a sent in function', () => {
            const Greeter = (outputMethod) => {
                return {
                    greet() {
                        return outputMethod('Hello World');
                    }
                }
            };

            const someLib = {
                output: function (msg) {
                    return msg;
                }
            };

            const greeter = Greeter(someLib.output);
            expect(greeter.greet()).toEqual('Hello World');
        });
    });

    describe('Encapsulation (we allready know that privateMember and message above are private members, but lets explore it a bit more)', () => {
        it('could provide getters and setters', () => {
            const Greeter = () => {
                let _message = 'Hello World!';

                return {
                    get() {
                        return _message;
                    },
                    set(message) {
                        _message = message;
                    }
                }
            };

            const greeter = Greeter();

            expect(greeter.get()).toEqual('Hello World!');

            greeter.set('Hello Foo!');

            expect(greeter.get()).toEqual('Hello Foo!');
        });

        it('could provide proper ES getter and setter', () => { 
            const Greeter = () => {
                let _message = 'Hello World!';

                return {
                    get message() {
                        return _message;
                    },
                    set message(message) {
                        _message = message;
                    }
                }
            };

            const greeter = Greeter();

            expect(greeter.message).toEqual('Hello World!');

            greeter.message = 'Hello Foo!';

            expect(greeter.message).toEqual('Hello Foo!');

            // It is impossible to access the _message variable from outside of the Factory Function. 
            // Data is kept private. Difference instances of greeter will have their own private copy of _message and will not conflict.
        });
    });
});
