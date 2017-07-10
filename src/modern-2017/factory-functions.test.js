const $ = require('jquery');

describe('Factory functions creates objects and return them, can be used instead of classes, and are more simple', () => {

    beforeEach(() => {
        const markup = '<div class="js-click-me">Click me</div>';
        document.body.innerHTML = markup;
    });

    describe('We should first look at an ES6 class', () => {

        class Dog {
            constructor() {
                this.sound = 'woof';
            }

            talk() {
                return this.sound;
            }

            setSound() {
                this.sound = 'woof2';
            }
        }

        it('should work as expected', () => {
            const sniffles = new Dog();
            expect(sniffles.talk()).toEqual('woof');
        });

        it('will be a problem with the this pointer', () => {
            const sniffles = new Dog();
            const spy = jest.spyOn(sniffles, 'setSound');

            $('.js-click-me').one('click', sniffles.setSound);
            $('.js-click-me').trigger('click');

            expect(spy).toHaveBeenCalled();
            expect(sniffles.talk()).not.toEqual('woof2'); // new sound has NOT been set since this, inside setSound, now points to the DOM element
        });

        it('will be a problem with the this pointer that we can fix - A', () => {
            const sniffles = new Dog();
            const spy = jest.spyOn(sniffles, 'setSound');

            $('.js-click-me').one('click', sniffles.setSound.bind(sniffles));
            $('.js-click-me').trigger('click');

            expect(spy).toHaveBeenCalled();
            expect(sniffles.talk()).toEqual('woof2'); // new sound HAS been set since we force this to be sniffles
        });

        it('will be a problem with the this pointer that we can fix - B', () => {
            const sniffles = new Dog();
            const spy = jest.spyOn(sniffles, 'setSound');

            $('.js-click-me').one('click', () => { sniffles.setSound() });
            $('.js-click-me').trigger('click');

            expect(spy).toHaveBeenCalled();
            expect(sniffles.talk()).toEqual('woof2'); // new sound HAS been set since we wrapped setSound in a function
        });

        it('should also relies that this.sound is not a private member of the class', () => { 
            const sniffles = new Dog();
            expect(sniffles.talk()).toEqual('woof');

            sniffles.sound = 'mjaa';
            expect(sniffles.talk()).toEqual('mjaa');

            // The only truly private data in JavaScript is still scoped variables
            // https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes
        });

    });

    describe('We should then look at factory functions', () => {

        it('should work as expected', () => {
            const dog = () => {
                let _sound = 'woof';
                let factory = {};

                factory.talk = () => {
                    return _sound;      // talk has access to sound because of closures
                };

                factory.setSound = () => {
                    _sound = 'woof2';
                };

                return factory;
            };

            const sniffles = dog();
            const spy = jest.spyOn(sniffles, 'setSound');

            expect(sniffles.talk()).toEqual('woof');

            $('.js-click-me').one('click', sniffles.setSound);
            $('.js-click-me').trigger('click');

            expect(spy).toHaveBeenCalled();
            expect(sniffles.talk()).toEqual('woof2'); // it just works, because we do not use the this keyword
        });

        // also _sound is truly private to the dog function

    });
});
