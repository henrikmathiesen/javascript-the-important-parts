describe('Prototype - the class keyword in ES6 is just a thin layer on top of prototype. Prototype can be seen as an object that another object can delegate to', () => {

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

        Object.setPrototypeOf(cat, animal); // set the prototype of cat to be animal
        // cat.prototype = animal;          // we can not set it like this, even though that would have made sence

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

        Object.setPrototypeOf(cat, animal);                     // set the prototype of cat to be animal
        Object.setPrototypeOf(dog, animal);                     // set the prototype of dog to be animal
        Object.setPrototypeOf(prarieDog, dog);                  // set the prototype of prarieDog to be dog

        expect(prarieDog.talk).toBeDefined();
        expect(prarieDog.talk()).toEqual('grawl');

        // Can reassign talk in the prototype and it will be reflected in the prarieDog
        animal.talk = function () { 
            return this.sound.toUpperCase();
        };

        expect(prarieDog.talk()).toEqual('GRAWL');

        expect(prarieDog.__proto__).toBe(dog);                  // prarieDog can delegate to dog because dog is its prototype
        expect(dog.__proto__).toBe(animal);                     // dog can delegate to animal because animal is its prototype

        expect(Object.getPrototypeOf(prarieDog)).toBe(dog);     // a more official way to get to an objects prototype
        expect(Object.getPrototypeOf(dog)).toBe(animal);

        // expect(prarieDog instanceof dog).toEqual(true);      even though prarieDog delegate to its prototype dog, it is not an instance of dog, since dog is not callable
    });

});
