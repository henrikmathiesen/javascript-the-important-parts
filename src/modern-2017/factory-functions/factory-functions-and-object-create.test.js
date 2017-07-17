// TODO

describe('Factory functions and Object.create and Object.assign', () => {
    it('is a function that returns an object with a proto set to another object', () => {
        const proto = {
            hello() {
                return `Hello, my name is ${this.name}`;
            }
        };

        const greeter = (name) => {
            const newObjWithProto = Object.create({}, proto);
            const newMergedObj = Object.assign(newObjWithProto, { name });
            
            return newMergedObj;
        };

        const adam = greeter('adam');
        const bertil = greeter('bertil');

        // different objects
        expect(adam).not.toBe(bertil);

        expect(adam.hello).toBeDefined();
    });
});
