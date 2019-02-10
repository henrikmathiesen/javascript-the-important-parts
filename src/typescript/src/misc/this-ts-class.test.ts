class Dog {
    private sound = 'woff';

    talk() {
        return this.sound;
    }

    getThis() {
        return this;
    }
}

class Cat {
    private sound = 'mow';

    talk = () => this.sound;

    getThis = () => this;
}

describe('this and ts classes', () => {

    it('should test this with normal methods', () => { 
        const dog = new Dog();

        expect(dog.talk()).toEqual('woff');
        expect(dog.getThis()).toBe(dog);
    });

    it('should test this with arrow functions', () => { 
        const cat = new Cat();

        expect(cat.talk()).toEqual('mow');
        expect(cat.getThis()).toBe(cat);
    });

});
