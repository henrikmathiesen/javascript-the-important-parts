describe('Factory functions and Object.create and Object.assign', () => {
    it('is a function that returns an object with a proto set to another object', () => {
        const proto = {
            hello() {
                return `Hello, my name is ${this.name}`;
            }
        };

        const greeter = (name) => {
            const _privateMember = 'foo';

            let obj = Object.create(proto);
            obj = Object.assign(obj, { name });
            return obj;
        }

        const adam = greeter('adam');
        const bertil = greeter('bertil');

        // different objects
        expect(adam).not.toBe(bertil);

        expect(adam.hello).toBeDefined();
        expect(bertil.hello).toBeDefined();
        expect(Object.getPrototypeOf(adam)).toBe(proto);
        expect(Object.getPrototypeOf(bertil)).toBe(proto);
    });
});
