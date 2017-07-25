describe('ES6 classes - javascript does not have classes, ES6 classes is just sugar on top of the prototype inheritence model', () => {

    it('should get a feel for a class', () => {
        class Mammal {
            constructor(sound) {
                this.sound = sound;
            }

            talk() {
                return this.sound;
            }
        }

        const fluffy = new Mammal('woff');

        expect(typeof fluffy === 'object').toEqual(true);                   // the instance is just an object
        expect(typeof Mammal === 'function').toEqual(true);                 // the class is just a function
        expect(Object.getPrototypeOf(fluffy)).toEqual(Mammal.prototype);    // here we see the prototype inheritence model (see more in the-new-keyword.test.js)
        expect(Mammal.prototype.isPrototypeOf(fluffy)).toEqual(true);       // and here, but the other way around
        expect(fluffy.talk()).toEqual('woff');
    });

    it('should know that classes can extend other classes', () => {
        class Animal {
            constructor(sound) {
                this.sound = sound;
            }

            talk() {
                return this.sound;
            }
        }

        class Dog extends Animal {
            // We dont need to have a constructor in the derived class, but if we do then it must call parent constructor with super()
            constructor(sound) {
                super(sound || 'woff');
            }
        }

        class PrarieDog extends Dog {
            constructor() {
                super('grawl');
            }
        }

        const dog = new Dog();
        expect(dog.talk()).toEqual('woff');

        const prarieDog = new PrarieDog();
        expect(prarieDog.talk()).toEqual('grawl');
    });

    it('should know that classes can not have private members (why? because javascript does not have classes! See the-new-keyword.test.js)', () => {
        class Animal {
            //private foo = 'test'; do not work

            // privateSound; do not work

            constructor(sound) {
                this._sound = sound;
            }

            talk() {
                return this.sound;
            }
        }

        const animal = new Animal('foo');
        expect(animal._sound).toEqual('foo');

        animal._sound = 'bar';
        expect(animal._sound).toEqual('bar');
    });

    it('should know that classes can have static methods', () => {
        class Animal {
            constructor(sound) {
                this._sound = sound;
            }

            talk() {
                return this._sound;
            }

            static getCompany() {
                return 'Foo';
            }
        }

        const animal = new Animal('woff');
        
        expect(animal.talk()).toEqual('woff');
        expect(animal.getCompany).not.toBeDefined();

        expect(Animal.getCompany()).toEqual('Foo');
        expect(Animal.talk).not.toBeDefined();
    });

    it('should know that ES6 classes are not hoisted', () => {
        //const foo = new Foo();
        //expect(foo).not.toBeDefined(); // reference error

        class Foo {}
    });

});
