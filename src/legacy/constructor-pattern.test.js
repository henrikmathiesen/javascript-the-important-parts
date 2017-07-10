describe('Legacy - constructor pattern', () => {
    it('should know that there are 3 common ways to create objects in javascript', () => {
        const newObject01 = {};
        const newObject02 = Object.create(Object.prototype);
        const newObject03 = new Object();
        const newObject04 = new Object({ name: 'foo' });

        expect(typeof newObject01 === 'object').toEqual(true);
        expect(typeof newObject02 === 'object').toEqual(true);
        expect(typeof newObject03 === 'object').toEqual(true);
        expect(typeof newObject04 === 'object').toEqual(true);
        expect(newObject04.name).toEqual('foo');
    });

    it('should know that Object.create inherits from the object passed in', () => {
        const newObject01 = { name: 'bar' };
        const newObject02 = Object.create(newObject01);

        expect(newObject02.name).toEqual('bar');
    });

    it('should understand Object.create vs new, there is an object inheritence (in javascript objects inherits from objects)', () => {
        // constructor function, for more see define-a-class.test.js

        function Apple() {
            this.color = 'red';
        }

        const apple = { color: 'red' };

        const apple01 = new Apple();
        const apple02 = Object.create(apple);

        expect(apple01.color).toEqual('red');
        expect(apple02.color).toEqual('red');

        apple.color = 'blue';
        expect(apple02.color).toEqual('blue');

        // this doesnt work
        Apple.prototype.color = 'pink';
        expect(apple01.color).not.toEqual('pink');
    });

    it('should understand that there are 3 ways to assign keys and values to an object', () => {
        const myObj01 = {};

        myObj01.name = 'foo';
        myObj01['age'] = 50;

        Object.defineProperty(myObj01, "someKey", {
            value: 'for more control of the behavior',
            writable: false,
            enumerable: true,
            configurable: true
        });

        // Object.defineProperties(...) did not work
        
        expect(myObj01.age).toEqual(50);
        expect(myObj01['name']).toEqual('foo');
        expect(myObj01.someKey).toEqual('for more control of the behavior');

        myObj01.someKey = 'no'; // not writable
        expect(myObj01.someKey).toEqual('for more control of the behavior');
    });
});
