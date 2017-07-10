const reject = require('lodash.reject');

describe('Higher-order functions', () => {

    it('should first know that in javascript we can pass around functions as values', () => {
        const tripple = n => n * 3;
        const foo = tripple;

        expect(foo(30)).toEqual(90);
    });

    const animals = [
        {
            name: 'Fluffy',
            type: 'rabbit'
        },
        {
            name: 'Caro',
            type: 'dog'
        },
        {
            name: 'Hamilton',
            type: 'dog'
        }
    ];

    it('filters out the dogs - should first use an example without any function passing', () => {
        const dogs = [];
        for (let animal = 0; animal < animals.length; animal++) {
            if (animals[animal].type === 'dog') {
                dogs.push(animals[animal]);
            }
        }

        expect(dogs.length).toEqual(2);
    });

    it('filters out the dogs - should know that passing functions into other functions is good for composition', () => {
        const dogs = animals.filter(animal => animal.type === 'dog');
        expect(dogs.length).toEqual(2);

        // filter is going to loop through every item in the array, and call the callback function passing it in
        // The callback function is returning a boolean, this tells filter what should be included in the dogs array
        // This version of filters out dogs is much smaller then previous version, because the looping is done inside filter
    });

    it('filters out dogs, with a custom filter', () => {
        const myFilter = function (callback) { // can not use arrow function since we loose this pointer
            const items = [];

            for (let i = 0; i < this.length; i++) {
                if (callback(this[i])) {
                    items.push(this[i]);
                }
            }

            return items;
        };

        animals.myFilter = myFilter;

        const dogs = animals.myFilter(animal => animal.type === 'dog');
        expect(dogs.length).toEqual(2);
    });

    it('should know that composable functions work well', () => { 
        const isDog = animal => animal.type === 'dog';
        const dogs = animals.filter(isDog);
        const others = reject(animals, isDog);

        expect(dogs.length).toEqual(2);
        expect(others.length).toEqual(1);
    });

});
