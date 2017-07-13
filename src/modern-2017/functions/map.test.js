describe('functions - map, just like filter it is a higher order function', () => {

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

    it('should know that map creates a new transformed array - here we want an array of all the names of the animals', () => {
        const names = animals.map(animal => animal.name);
        expect(names.length).toEqual(3);
        expect(names[0]).toEqual('Fluffy');

        // original array is left alone
        expect(animals[0].name).toBeDefined();
        expect(animals[0].type).toBeDefined();
    });

    it('should know that it is a nice little syntax', () => {
        const names = animals.map(animal => `${animal.name} is a ${animal.type}`);
        expect(names[0]).toEqual('Fluffy is a rabbit');
    });

});
