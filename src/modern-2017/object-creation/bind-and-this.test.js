describe('bind and this', () => {

    it('should be aware of this pointer in this method', () => {
        const dog = {
            sound: 'woff',
            talk: function () { 
                return this.sound;
            }
        };

        expect(dog.talk()).toEqual('woff');
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

});
