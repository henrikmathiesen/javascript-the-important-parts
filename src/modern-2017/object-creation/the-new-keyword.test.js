describe('The new keyword as applied to functions, to get a class behavior', () => {
    it('should understand the ES5 code (also understand that ES6 classes uses this under the hood)', () => {
        function Person(saying) {
            // saying is recreated for all objects
            this.saying = saying;
        }

        // talk is shared with all objects, it is set on Person:s prototype so person objects can delegate to it
        Person.prototype.talk = function () {
            return 'I say ' + this.saying;
        };

        // we can have a static method also
        Person.staticMethod = function () {
            return {
                text: 'Apples are tasty',
                saying: this.saying // this is undefined here, but in a browser this would point to window (https://stackoverflow.com/questions/133973/how-does-this-keyword-work-within-a-function)
            }
        };

        // You would think that this also would work, but it does not
        // const test = {
        //     talk: function () {
        //         return 'I say ' + this.saying;
        //     }
        // };
        // Object.setPrototypeOf(Person, test);

        // It seems like for constructor functions we have to use the prototype property
        // For objects we have to use Object.setPrototypeOf (see prototype.test.js)

        // This will however work Object.setPrototypeOf(Person.prototype, test);

        const crockford = new Person('semicolons!');
        expect(crockford.talk()).toEqual('I say semicolons!');

        const foo = new Person('bar');
        expect(foo.talk()).toEqual('I say bar');

        expect(Person.staticMethod().text).toEqual('Apples are tasty');
        expect(Person.staticMethod().saying).toEqual(undefined);
    });

    it('should understand what happens when we call new', () => {
        function Person(saying) {
            this.saying = saying;
        }

        Person.prototype.talk = function () {
            return 'I say ' + this.saying;
        };

        const crockford = new Person('semicolons!');
        expect(crockford.talk()).toEqual('I say semicolons!');
        expect(crockford.saying).toEqual('semicolons!');

        // This is what new does
        // - it creates a new empty object
        // - it will look at Person:s prototype property (functions have these, functions are special objects) and set it as prototype of the new empty object
        // - it will call the Person function (called constructor function) with the new object assigned to the this variable
        // - it will return the new object
    });

    it('should understand how to manually build the new functionality (we name new spawn here)', () => {
        function Person(saying) {
            this.saying = saying;

            // dont do this
            // return {
            //     dumb: true
            // }
        }

        // the prototype property only exists on functions, and they exists because we could use functions as constructors
        Person.prototype.talk = function () {
            return 'I say ' + this.saying;
        };

        // this is our own new functionality
        function spawn(constructor) {
            const obj = {};                                             // it creates an empty object
            Object.setPrototypeOf(obj, constructor.prototype);          // it takes the prototype of the constructor function and set as prototype for the new empty object
            const argsArray = Array.prototype.slice.apply(arguments);   // middle step, convert arguments object to a proper array
            return constructor.apply(obj, argsArray.slice(1)) || obj    // it calls the constructor function (apply), with the new object assigned to the this variable and passed in arguments
                                                                        // it returns the constructor return (if it returns something, which it really shouldnt, bad practice)
                                                                        // or it returns the object
        }

        const crockford = spawn(Person, 'semicolons!');
        expect(crockford.talk()).toEqual('I say semicolons!');
        expect(crockford.saying).toEqual('semicolons!');

        const harry = spawn(Person, 'make my day');
        expect(harry.talk()).toEqual('I say make my day');
        expect(harry.saying).toEqual('make my day');

        expect(crockford instanceof Person).toEqual(true);                  // crockford is an instance of person since the prototype of its constructor function is its prototype
        expect(Object.getPrototypeOf(crockford)).toBe(Person.prototype);    // as we can see here, inspecting crockford:s __proto__
    });

    it('should understand a bit more about prototype and __proto__', () => {
        function func() {

        }

        // the prototype property only exists on functions, and they exists because we could use functions as constructors
        expect(typeof func.prototype === 'object').toEqual(true);

        // functions also has a __proto__ , dont know what its use case is ...
        expect(typeof func.__proto__ === 'function').toEqual(true);

        // can also use this expression to see the same thing
        expect(typeof Object.getPrototypeOf(func) === 'function').toEqual(true);

        const obj = {};
        const child = {};
        Object.setPrototypeOf(child, obj);

        // objects do not have a prototype property
        expect(obj.prototype).not.toBeDefined();
        expect(child.prototype).not.toBeDefined();

        // they do have a __proto__ property
        expect(obj.__proto__).toBeDefined();

        // they also have this way of seeing the prototype
        expect(Object.getPrototypeOf(child)).toBe(obj);

        // if object is not set up to delegate to another object, it will delegate to ("base")Object:s prototype
        expect(obj.__proto__ === Object.prototype).toEqual(true);

        // ("base")Object:s prototype is an empty object
        expect(Object.prototype).toEqual({});

        // and since the ("base")Object has a prototype property, it means that it is a function
        expect(typeof Object === 'function').toEqual(true);
    });


    // clear as the july sky ;)
});
