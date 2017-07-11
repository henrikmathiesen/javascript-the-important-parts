describe('Prototype - the class keyword in ES6 is just a thin layer on top of prototype. Prototype can be seen as a delegation to another object', () => {

    it('should understand that prototype is a delegation to another object', () => {
        function talk() {
            return this.sound;
        }

        const animal = {
            talk
        };

        const cat = {
            sound: 'meow'
        };

        expect(cat.talk).not.toBeDefined();

        Object.setPrototypeOf(cat, animal);

        // The javascript enginge is first looking if cat has a talk property, if not it looks in its prototype chain and finds it on animal
        // The talk functionality is delegated to the animal, this still points to cat
        expect(cat.talk).toBeDefined();
        expect(cat.talk()).toEqual('meow');
    });

    it('should understand that we can set up a prototype chain', () => {
        const animal = {
            talk: function () {
                return this.sound;
            }
        };

        const cat = {
            sound: 'meow'
        };

        const dog = {
            sound: 'woff'
        };

        const prarieDog = {
            sound: 'grawl'
        };

        Object.setPrototypeOf(cat, animal);
        Object.setPrototypeOf(dog, animal);
        Object.setPrototypeOf(prarieDog, dog);

        expect(prarieDog.talk).toBeDefined();
        expect(prarieDog.talk()).toEqual('grawl');

        // Can reassign talk in the prototype and it will be reflected in the prarieDog
        animal.talk = function () { 
            return this.sound.toUpperCase();
        };

        expect(prarieDog.talk()).toEqual('GRAWL');
    });

});
