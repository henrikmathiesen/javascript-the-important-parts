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
            const _privateVarInConstructorFunction = 'foo';
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
        // - prototype are things that are put in other objects __proto__
        // - A change in the prototype will be reflected in all instances
        // - Since this is not a pattern we are going to use, we are going to skipp inheritence.
        // - But see legacy/constructors-prototypes-and-the-new-keyword.test.js , at the bottom, for more info on inheritence
    });

    it('should be able to do and understand Object.create', () => {
        const proto = {
            talk: function () {
                // in here, this will point to the instance
                return 'hi'
            }
        };

        // Object.create returns an object, in this case obj
        // obj now has a reference to proto and can delegate to it, proto is a prototype put in obj:s __proto__
        // A change to the prototype will be reflected in the "instances"
        // Object.create takes a second argument, a propertiesObject, which I havent seen in realistic examples
        const obj = Object.create(proto);

        // just like dog has a reference to Animal.prototype, obj has a reference to proto - through its __proto__
        expect(Object.getPrototypeOf(obj)).toBe(proto);
        expect(obj.talk).toBeDefined();

        // We can not use this check as proto is not callable
        //expect(obj instanceof proto).toEqual(false);

        // since proto:s __proto_ is Object:s prototype, obj can use these methods
        expect(obj.toString).toBeDefined();
        expect(Object.getPrototypeOf(proto)).toBe(Object.prototype);

        // We add new things to obj
        obj.foo = 'bar';

        // And create another object which proto is set to obj
        const another = Object.create(obj);
        expect(Object.getPrototypeOf(another)).toBe(obj);

        // another now has access to both talk and foo, as well as Object:s prototype
        expect(another.talk).toBeDefined();
        expect(another.foo).toEqual('bar');
        expect(another.toString).toBeDefined();

        // finally, we can skip setting a proto for our object by passing null
        const noFriendsInHighPlaces = Object.create(null);
        expect(Object.getPrototypeOf(noFriendsInHighPlaces)).toBe(null);

        // It does not even get Object:s prototype(?)
        expect(noFriendsInHighPlaces.toString).not.toBeDefined();
    });

    it('should understand Object.assign (not directly relevant to prototyping)', () => {
        // The Object.assign() method is used to copy the values of all properties from one or more source objects to a target object. 
        // It will return the target object

        // Perhaps not such a realistic example
        let target = { name: 'foo' };
        const sourceOne = { name: 'bar', age: 50 };
        const sourceTwo = { age: 60, active: true };

        const targetAssigned = Object.assign(target, sourceOne, sourceTwo);

        // First lets get the prototype stuff out of the way, Object.assign does not change objects __proto__
        expect(Object.getPrototypeOf(sourceOne)).not.toBe(target);
        expect(Object.getPrototypeOf(target)).not.toBe(sourceOne);

        // The sources are unchanged
        expect(sourceOne).toEqual({ name: 'bar', age: 50 });
        expect(sourceTwo).toEqual({ age: 60, active: true });

        // The target put into Object.assign has changed to a new object
        expect(target).not.toEqual({ name: 'foo' });

        // The returned object has the same properties as target and are in fact the same reference
        expect(target).toBe(targetAssigned);

        // So lets look att targetAssigned, what happened to it?
        // - the objects are sort of merged
        // - if there is a conflict in names, the outmost right wins
        //      * bar has replaced foo, 60 has replaced 50
        expect(targetAssigned).toEqual({ name: 'bar', age: 60, active: true });

        // # Can also merge to an empty object, making a copy
        const bringIt = { name: 'adam' };
        const copy = Object.assign({}, bringIt);
        expect(copy).toEqual({ name: 'adam' });

        //
        // # What about object referenced?
        // - The reference gets copied
        
        const obj01 = { name: 'adam' };
        const obj02 = { age: 50 };
        const objA = { obj01, obj02 }
        const newOne = Object.assign(objA);

        expect(objA.obj01).toBe(newOne.obj01);
    });

});
