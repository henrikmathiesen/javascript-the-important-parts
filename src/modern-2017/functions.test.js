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

    });

    describe('arrow functions', () => {

    });

    describe('function vs method', () => {

    });

});
