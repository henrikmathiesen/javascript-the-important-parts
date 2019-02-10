describe('bind and this', () => {

    it('should be aware of this pointer in this method', () => {
        const dog = {
            sound: 'woff',
            talk: function () {
                return this.sound;
            },
            getThis: function () { 
                return this;
            }
        };

        expect(dog.talk()).toEqual('woff');
        expect(dog.getThis()).toBe(dog);
    });

    it('should also be aware of this pointer in this method using arrow function', () => {
        const dog = {
            sound: 'woff',
            talk: () => this.sound,
            getThis: () => this
        };

        expect(dog.talk()).toEqual(undefined);
        expect(dog.getThis()).toEqual({});          // No window object in Jest. Global object?
    });

    it('should be aware of this pointer in this method also', () => {
        const dog = {
            sound: 'woff',
            talk: function () {
                return this.sound;
            }
        };

        // functions can be assigned to variables, but in this case we loose the this context
        // javascripts function oriented nature clashes with its object oriented nature
        // this has lost its connection to the dog object (it points to the global object)
        const talkFunction = dog.talk;

        expect(talkFunction()).toEqual(undefined);
    });

    it('should be aware of this pointer in this method can be fixed', () => {
        const dog = {
            sound: 'woff',
            talk: function () {
                return this.sound;
            }
        };

        const talkFunction = dog.talk.bind(dog);

        expect(talkFunction()).toEqual('woff');
    });

    // this is context sensitive

});
