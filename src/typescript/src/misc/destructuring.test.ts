class Animal {
    constructor(
        public name: string,
        public age: number
    ) { }
}

class DoSomething {

    doSomeThingWithAnAnimal({ name, age }: Animal) {
        // could also destructure here
        // const { name, age } = animal;
        // animal is then the argument. Tends to work better if we have multiple objects as arguments
        return { name, age };
    }

}

describe('destructuring', () => {

    it('should destructure', () => {
        const animal = new Animal('lion', 10);
        expect(new DoSomething().doSomeThingWithAnAnimal(animal)).toEqual({ name: 'lion', age: 10 });
    });

});
