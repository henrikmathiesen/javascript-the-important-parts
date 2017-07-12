describe('Object.create is a static method on the Object prototype, it creates a new object with the prototype set to a certain object', () => {

    /*
        Why does Object.create exist?
        - It is more natural to the prototype model than the "new" keyword (see the-new-keyword.test.js)
        - Douglas crockford wrote Object.create and got it into the language
        - Object.setPrototypeOf(dog, animal) is a very bad idea from a performance standpoint, Object.create is more perfomant
        - It is a nice strait forward way to work with objects and a sort of inheritance (really delegation to another object)
    */

    it('should get a feel for Object.create', () => {
        const cat = {
            makeSound: function () {
                return this.sound;
            }
        };

        const mark = Object.create(cat);
        mark.sound = 'meow';
        expect(mark.makeSound()).toEqual('meow');

        const waffles = Object.create(cat);
        waffles.sound = 'beep';
        expect(waffles.makeSound()).toEqual('beep');

        expect(Object.getPrototypeOf(mark)).toBe(cat);
        expect(Object.getPrototypeOf(waffles)).toBe(cat);
    });

    it('should understand that we can set up a prototype chain, where objects can delegate to its prototype (like to the talk method on animal)', () => {
        const animal = {
            talk: function () {
                return this.sound;
            }
        };

        const dog = Object.create(animal);
        dog.sound = 'woff';

        const prarieDog = Object.create(dog);
        prarieDog.sound = 'grawl';

        expect(prarieDog.talk()).toEqual('grawl');

        // can check an object:s prototype like this
        expect(Object.getPrototypeOf(dog)).toBe(animal);
        expect(Object.getPrototypeOf(prarieDog)).toBe(dog);

        // can also check it this way
        expect(animal.isPrototypeOf(dog)).toEqual(true);
        expect(dog.isPrototypeOf(prarieDog)).toEqual(true);
    });

    it('should understand how to manually build the Object.create functionality', () => {
        // this is our own Object.create functionality
        // however the native implementation is more perfomant ...
        function objectCreate(proto) {
            const obj = {};
            Object.setPrototypeOf(obj, proto);
            return obj;
        }

        const animal = {
            talk: function () {
                return this.sound;
            }
        };

        const dog = objectCreate(animal);
        dog.sound = 'woff';

        const prarieDog = objectCreate(dog);
        prarieDog.sound = 'grawl';

        expect(prarieDog.talk()).toEqual('grawl');
    });

    it('should get a feel for a more realistic example of using Object.create', () => {
        const animal = {
            init: function (sound) {
                this.sound = sound;
                // and a lot of other stuff perhaps ...
                // returning this makes calls chainable
                return this;
            },
            talk: function () {
                return this.sound;
            }
        };

        const dog = Object.create(animal).init('woff');
        const prarieDog = Object.create(dog).init('grawl');

        expect(prarieDog.talk()).toEqual('grawl');
    });

});
