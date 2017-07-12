describe('Legacy - Define a class', () => {

    describe('Define a class using a function (javascript is a classless language, but the behavior can be simulated)', () => {

        it('creates a class and instantiates it using the new keyword (getInfo is recreated every time we create a new object)', () => {
            function Apple(type) {
                const _private = 'implementation detail';
                let _constructed = 0;
                _constructed++;

                this.constructed = _constructed;
                this.type = type;
                this.color = 'red';
                this.getInfo = function () {
                    return {
                        color: this.color,
                        type: this.type,
                        constructed: _constructed,
                        thisConstructed: this.constructed
                    };
                };
            }

            const apple01 = new Apple('macintosh');
            apple01.color = 'reddish';

            const apple02 = new Apple('cedar');
            apple02.color = 'blueish';

            expect(apple01._private).toEqual(undefined);
            expect(Apple._private).toEqual(undefined);

            expect(apple01.getInfo().color).toEqual('reddish');
            expect(apple01.getInfo().type).toEqual('macintosh');
            expect(apple01.getInfo().constructed).toEqual(1);
            expect(apple01.getInfo().thisConstructed).toEqual(1);

            expect(apple02.getInfo().color).toEqual('blueish');
            expect(apple02.getInfo().type).toEqual('cedar');
            expect(apple02.getInfo().constructed).toEqual(1);
            expect(apple02.getInfo().thisConstructed).toEqual(1);

            expect(typeof apple01 === 'object').toEqual(true);
        });

        it('creates a class and instantiates it using the new keyword (getInfo is NOT recreated every time we create a new object, which is more efficient)', () => {
            function Apple(type) {
                const _private = 'implementation detail';
                let _constructed = 0;
                _constructed +=1;

                this.constructed = _constructed;
                this.type = type;
                this.color = 'red';
            }

            Apple.prototype.getInfo = function () {
                return {
                    color: this.color,
                    type: this.type,
                    //constructed: _constructed, we can not get to this here
                    thisConstructed: this.constructed
                };
            };

            const apple01 = new Apple('macintosh');
            apple01.color = 'reddish';

            const apple02 = new Apple('cedar');
            apple02.color = 'blueish';

            expect(apple01._private).toEqual(undefined);
            expect(Apple._private).toEqual(undefined);

            expect(apple01.color).toEqual('reddish');
            expect(apple01.getInfo().color).toEqual('reddish');
            expect(apple01.getInfo().type).toEqual('macintosh');
            expect(apple01.getInfo().thisConstructed).toEqual(1);

            expect(apple02.color).toEqual('blueish');
            expect(apple02.getInfo().color).toEqual('blueish');
            expect(apple02.getInfo().type).toEqual('cedar');
            expect(apple02.getInfo().thisConstructed).toEqual(1);
        });

        it('creates a class with a sort of static method by adding a property to the function object (In JavaScript functions are first-class objects)', () => {
            function Apple(type, color) {
                this.type = type;
                this.color = color;
            }

            Apple.prototype.getInfo = function () {
                return this.type + ' ' + this.color;
            };

            Apple.staticMethod = function () {
                return {
                    text: 'Apples are tasty',
                    color: this.color // this is undefined here, but in a browser this would point to window (https://stackoverflow.com/questions/133973/how-does-this-keyword-work-within-a-function)
                }
            };

            const apple = new Apple('awesome', 'pink');

            expect(apple.getInfo()).toEqual('awesome pink');
            expect(Apple.staticMethod().text).toEqual('Apples are tasty');
            expect(Apple.staticMethod().color).toEqual(undefined);
        });

    });

    describe('using object syntax (such an object is also sometimes called singleton)', () => {

        it('can skip the class stuff and just create instances using regular objects', () => {
            const apple01 = {
                type: 'macintosh',
                color: 'reddish',
                getInfo: function () { // can not have an arrow function here since this would point to an empty object
                    const _privateMembersWouldHaveToBeHere = 'some detail';

                    return {
                        color: this.color,
                        type: this.type
                    }
                }
            };

            const apple02 = {
                type: 'cedar',
                color: 'blueish',
                getInfo: function () {
                    const _privateMembersWouldHaveToBeHere = 'some detail';

                    return {
                        color: this.color,
                        type: this.type
                    }
                }
            };

            expect(apple01.type).toEqual('macintosh');
            expect(apple01.getInfo().type).toEqual('macintosh');

            expect(apple02.type).toEqual('cedar');
            expect(apple02.getInfo().type).toEqual('cedar');
        });

    });

});


