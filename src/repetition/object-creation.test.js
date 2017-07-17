describe('Repetition - object creation', () => {

    /*
        JavaScript does not have classes, not even ES6
        - objects inherits from objects by delegating to them
        - this is done through the concept of prototype
    */

    it('should understand the creation of a plain old object', () => { 
        // When creating an object we are creating an instance of the Object constructor
        const obj = { name: 'adam' };

        // The Object constructor (which is a function and an object)
        // has a prototype with functionality on it that all instances share
        expect(Object.prototype).toBeTruthy();
        expect(Object.prototype.toString).toBeDefined();
        
        // the name property is local to the object instance
        // but the things on Object.prototype is shared for all object instances
        expect(obj.toString).toBeDefined();

        // As we can see obj can delegate to Object:s prototype
        // .__proto__ and Object.getPrototypeOf are the same thing, we will use Object.getPrototypeOf from here on
        expect(obj.__proto__).toBe(Object.prototype);
        expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);
        expect(obj instanceof Object).toEqual(true);
    });

    it('should be able to do and understand a constructor function', () => {
        function Animal(sound) {
            this.sound = sound; // these things are local to each instance
        }

        // functions are special objects that have a prototype property, an empty object
        // The reference to the prototype object is copied to the internal [[Prototype]] property of the new instance. 
        expect(Animal.prototype).toEqual({});

        // We can set things on the prototype, these things are shared for all instances
        Animal.prototype = {
            talk: function () {
                return this.sound;
            }
        };

        const dog = new Animal('woff');
        const cat = new Animal('meow');

        // since new creates a new object internally (see the-new-keyword.test.js)
        // dog and cat will share things
        // they share things from the prototype of Animal and Object
        expect(cat.toString).toBeDefined();
        expect(Object.getPrototypeOf(Animal)).toBe(Object.getPrototypeOf(Object));

        expect(dog.talk()).toEqual('woff');
        expect(cat.talk()).toEqual('meow');

        expect(dog instanceof Animal).toEqual(true);
        expect(cat instanceof Animal).toEqual(true);

        expect(Object.getPrototypeOf(dog)).toBe(Animal.prototype);
        expect(Object.getPrototypeOf(cat)).toBe(Animal.prototype);

        // - this.sound is local to each instance
        // - Animal.prototype is set as internal prototype (__proto__) of each instance
        // - __proto__ is a place, by, reference, that each instance can delegate functionality to
        // - Since this is not a pattern we are going to use, we are going to skipp inheritence.
        // - But see legacy/constructors-prototypes-and-the-new-keyword.test.js , at the bottom, for more info on inheritence
    });

    it('should be able to do and understand Object.create', () => {

    });

});
