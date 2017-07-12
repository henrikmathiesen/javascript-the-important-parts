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

        // You would think that this also would work, but it does not
        // const test = {
        //     talk: function () {
        //         return 'I say ' + this.saying;
        //     }
        // };
        // Object.setPrototypeOf(Person, test);

        // It seems like for constructor functions we have to use the prototype property
        // For objects we have to use Object.setPrototypeOf (see prototype.test.js)

        const crockford = new Person('semicolons!');
        expect(crockford.talk()).toEqual('I say semicolons!');

        const foo = new Person('bar');
        expect(foo.talk()).toEqual('I say bar');
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
        // - it will look at Person object:s (Person function is treated as an object) prototype and set it as prototype of the new empty object
        // - it will call the Person function (called constructor function) with the new object assigned to the this variable
        // - it will return the new object
    });
});
