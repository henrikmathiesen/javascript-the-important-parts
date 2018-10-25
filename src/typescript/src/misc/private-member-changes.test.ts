class Person {
    private name = 'John Doe';  // this gets copied to each object (see build code). In typescript we cant access it on the object (although p1['name'] = 'foo' works)

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}

describe('Will name change for second reference?', () => {

    it('should verify that name doesnt change, because it is not on the prototype', () => { 
        const p1 = new Person();
        const p2 = new Person();

        expect(p1.getName()).toBe('John Doe');
        expect(p2.getName()).toBe('John Doe');

        p1.setName('Jane Poe');

        expect(p1.getName()).toBe('Jane Poe');
        expect(p2.getName()).toBe('John Doe');
    });

});
