// TODO

describe('var, let and const', () => {
    describe('how var worked', () => {
        it('is NOT scoped to curly braces', () => {
            for (var i = 1; i < 11; i++) {

            }

            expect(i).toEqual(11); // we can access i out here (and it is 11 after the loop)
        });

        it('should understand why - it is because of hoisting, the code actually gets run like this', () => {
            var i;

            for (i = 1; i < 11; i++) {

            }

            expect(i).toEqual(11); // we can access i out here (and it is 11 after the loop)
        });

        // if we forgot the var keyword entirely, i gets put on the window object (and that is not cool)
        // for(i = 1; ....)
        // 'use strict' will prevent this however and will throw a 'i is not defined run time error'

        // also, var keyword is allowed multipe times for the same variabel name
        // and that variable will just get reassigned
        // var i = 1;
        // var i = 2;
        // i will be 2

        it('should understand that ES5 only has function scope', () => {
            (function () {
                for (var i = 1; i < 11; i++) {

                }
            })();

            //expect(i).not.toBeDefined(); i is not defined, actually it gives a reference error so we cant test it like that
            // but the point is that i is scoped to the function and not accessible outside of it
        });
    });

    describe('lets look at the let variable', () => {
        it('IS scoped to curly braces', () => {
            for (let i = 1; i < 11; i++) {

            }

            //expect(i).not.toBeDefined(); i is not defined, actually it gives a reference error so we cant test it like that
            // but the point is that i is scoped to the curly braces and not accessible outside of it
        });
    });


    describe('now we look at const - it is exactly like let, but you can not reassign it', () => {
        it('should understand - sample A', () => {
            let x = 1;
            x = 2;
            expect(x).toEqual(2);
        });

        it('should understand - sample B', () => {
            const x = 1;
            //x = 2; run time error Assignment to constant variable
        });

        it('should understand - sample C', () => {
            const obj = { name: 'foo' };
            // obj = { name: 'bar' }; run time error Assignment to constant variable
            obj.name = 'bar'; // ok
            expect(obj.name).toEqual('bar');

            // const does not make object immutable
        });

        it('should understand - sample D', () => {
            const myArr = ['adam'];
            // myArr = [1]; not ok

            // ok
            myArr.push('bertil');
            myArr.push('ceasar');
            myArr.pop();

            expect(myArr).toEqual(['adam', 'bertil']);
        });
    });

    /*
        DO NOT USE var anymore
        Use let for variables that you will reassign (like i in a for loop)
        Use const for everything else (its safer and communicates intent)
    */

});
