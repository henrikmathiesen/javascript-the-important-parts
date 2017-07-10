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

});
