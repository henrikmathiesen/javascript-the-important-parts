describe('Factory functions creates objects and return them, can be used instead of classes, and are more simple', () => {

    it('should first look at an ES6 class', () => {
        class Dog {
            constructor() {
                this.sound = 'woof';
            }

            talk() {
                return this.sound;
            }
        }

        const sniffles = new Dog();
        expect(sniffles.talk()).toEqual('woof');
    });

});
