describe('ES6 - destructuring, break apart stuff into variables', () => {

    it('should get at feel for it', () => {
        const animal = {
            species: 'dog',
            weight: 23,
            sound: 'woof'
        };

        const { species, sound } = animal;
        expect(species).toEqual('dog');
        expect(sound).toEqual('woof');
    });

    it('should know that destructuring makes it easier to work with objects passed to functions - example A without destructuring', () => {
        const makeSound = (options) => {
            options.species = options.species || 'animal';
            return `The ${options.species} says ${options.sound}`   // We are using template literals here
        };

        const actual = makeSound({
            // species is not passed to the makeSound function
            weight: 23,
            sound: 'woof'
        });

        expect(actual).toEqual('The animal says woof');

        // There are problems with the makeSound function
        // - Repetition, we refer to options alot
        // - It is a bit hard to scan
        // - It also hard to see what makeSound needs from the function signature
    });

    it('should know that destructuring makes it easier to work with objects passed to functions - example B without destructuring', () => {
        const makeSound = (options) => {
            const species = options.species || 'animal';
            const sound = options.sound;
            return `The ${species} says ${sound}`
        };

        const actual = makeSound({
            // species is not passed to the makeSound function
            weight: 23,
            sound: 'woof'
        });

        expect(actual).toEqual('The animal says woof');

        // Its a bit clearer now
        // - Less referal to options
        // - It is easier to scan
        // - We can, at least at the top of the function, see what it need
    });

    it('should know that destructuring makes it easier to work with objects passed to functions - with destructuring', () => {
        const makeSound = ({ species = 'animal', sound }) => {
            return `The ${species} says ${sound}`;
        };

        const actual = makeSound({
            // species is not passed to the makeSound function
            weight: 23,
            sound: 'woof'
        });

        expect(actual).toEqual('The animal says woof');

        // Thats better!
    });

    it('should know that we can destructure arrays also', () => {
        const myArray = ['adam', 'bertil', 'ceasar'];
        const [adam, , ceasar] = myArray;
        
        expect(adam).toEqual('adam');
        expect(ceasar).toEqual('ceasar');
    });

});
