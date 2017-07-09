const curry = require('lodash.curry'); // If Webpack where to make a web bundle it would only include the one function curry(?), more perfomant. This requires dependencies to both lodash and lodash.curry

describe('Currying - is when a function does not take all its arguments up front, instead we call it with one argument, the function returns a function that takes the second argument and so on, lastly we get a value back', () => {

    it('is not yet curried (note that no {} auto returns the string)', () => {
        const dragon = (name, size, element) =>
            name + ' is a ' +
            size + ' dragon that breathes ' +
            element + '!';


        const actual = dragon('Fluffy', 'tiny', 'lightning');
        expect(actual).toEqual('Fluffy is a tiny dragon that breathes lightning!');
    });

    it('is a curried version of the above function, dragon is a function that takes a name and return a function that takes a size that returns a function that takes an element and returns the final string', () => {
        const dragon =
            name =>
                size =>
                    element =>
                        name + ' is a ' +
                        size + ' dragon that breathes ' +
                        element + '!';

        const actual = dragon('Fluffy')('tiny')('lightning');
        expect(actual).toEqual('Fluffy is a tiny dragon that breathes lightning!');
    });

    it('is also possible to break up the functions', () => {
        const dragon =
            name =>
                size =>
                    element =>
                        name + ' is a ' +
                        size + ' dragon that breathes ' +
                        element + '!';

        const fluffyDragon = dragon('Fluffy');
        const tinyDragon = fluffyDragon('tiny')

        const actual = tinyDragon('lightning');
        expect(actual).toEqual('Fluffy is a tiny dragon that breathes lightning!');
    });

    it('should know that lodash can currying an uncurryid function', () => {
        let dragon = (name, size, element) =>
            name + ' is a ' +
            size + ' dragon that breathes ' +
            element + '!';

        dragon = curry(dragon);

        const actual = dragon('Fluffy')('tiny')('lightning');
        expect(actual).toEqual('Fluffy is a tiny dragon that breathes lightning!');
    });

});
