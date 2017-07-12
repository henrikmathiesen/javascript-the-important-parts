const $ = require('jquery');

describe('Factory functions creates objects and return them, can be used instead of classes, and are more simple', () => {

    beforeEach(() => {
        const markup = '<div class="js-click-me">Click me</div>';
        document.body.innerHTML = markup;
    });

    describe('We should first look at an ES6 class', () => {

        class Dog {
            constructor() {
                this.workCount = 0;
                this.sound = 'woof';
                // this.setSound = this.setSound.bind(this); this is another way to solve it and prefered over A
            }

            talk() {
                return this.sound;
            }

            setSound() {
                this.sound = 'woof2';
            }

            job() {
                this.workCount += 1;
                return 'working ' + this.workCount + ' times';
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

        it('should persist the workcount variable', () => {
            const dog01 = new Dog();
            const dog02 = new Dog();

            expect(dog01.job()).toEqual('working 1 times');
            expect(dog01.job()).toEqual('working 2 times');
            expect(dog02.job()).toEqual('working 1 times');
        });

        it('should persist the workcount variable in an ES5 class also', () => {
            function Dog() {
                this.workCount = 0;
            }

            Dog.prototype.job = function () {
                this.workCount += 1;
                return 'working ' + this.workCount + ' times';
            };

            const dog01 = new Dog();
            const dog02 = new Dog();

            expect(dog01.job()).toEqual('working 1 times');
            expect(dog01.job()).toEqual('working 2 times');
            expect(dog02.job()).toEqual('working 1 times');
        });

    });

    describe('We should then look at factory functions', () => {

        it('should work as expected', () => {
            const dog = () => {
                let _sound = 'woof';    // _sound is truly private to the dog function
                const factory = {};

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

        it('should have access to outer variable and outer variable will persist for the object', () => {
            const worker = () => {
                let _workCount = 0;
                const factory = {};

                factory.job = () => {
                    _workCount += 1;
                    return 'working ' + _workCount + ' times';
                };

                return factory;
            };

            const worker01 = worker();
            const worker02 = worker();

            expect(worker01.job()).toEqual('working 1 times');
            expect(worker01.job()).toEqual('working 2 times');
            expect(worker02.job()).toEqual('working 1 times');
        });

    });

});
