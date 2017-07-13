describe('functions - array functions', () => {

    // also see filter in higher-order-functions.test.js

    describe('map, just like filter it is a higher order function', () => {

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

        it('should know that map creates a new transformed array (with the same length!) - here we want an array of all the names of the animals', () => {
            const names = animals.map(animal => animal.name);
            expect(names.length).toEqual(3);
            expect(names[0]).toEqual('Fluffy');

            // original array is left alone
            expect(animals[0].name).toBeDefined();
            expect(animals[0].type).toBeDefined();
        });

        it('should know that it is a nice little syntax', () => {
            const names = animals.map(animal => `${animal.name} is a ${animal.type}`);
            expect(names.length).toEqual(3);
            expect(names[0]).toEqual('Fluffy is a rabbit');
        });

    });

    describe('reduce, just like filter it is a higher order function, it is the multi tool of array transformations', () => {
        it('should be able to summarize all the amounts', () => {
            const nums = [1, 2, 3];

            const orders = [
                { amount: 250 },
                { amount: 400 },
                { amount: 100 },
                { amount: 325 }
            ];

            const sums = nums.reduce((result, number) => result + number);
            expect(sums).toEqual(6);

            const ordersSum = orders.reduce((result, item) => result + item.amount, 0); // since first item is an object (and not a number), we need to set result to 0 for first iteration
            expect(ordersSum).toEqual(1075);
        });

        it('should list all films', () => {
            const people = [
                {
                    name: 'Adam',
                    movies: ['Golden Eye', 'Con Air', 'The Expendables']
                },
                {
                    name: 'Frank',
                    movies: ['Silence of the Lambs', 'The Midnight Express']
                },
                {
                    name: 'Alice',
                    movies: ['The Lord of the Rings']
                }
            ];

            const movies = people.reduce((result, item) => [...result, ...item.movies], []);
            // since first item is an object, we need to set result to be an array in the first iteration

            expect(movies).toEqual(['Golden Eye', 'Con Air', 'The Expendables', 'Silence of the Lambs', 'The Midnight Express', 'The Lord of the Rings']);
        });
    });


    // TODO: every() some() find()


});

