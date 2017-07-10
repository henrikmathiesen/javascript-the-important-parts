describe('closures - the function body has access to variables that are defined outside the function', () => {

    it('should understand closure through an example - A', () => {
        const me = 'Henke';
        const func = () => {
            return 'Hello ' + me;
        };

        expect(func()).toEqual('Hello Henke');
    });

    it('should understand closure through an example - B, can reassign me and have it reflected', () => {
        let me = 'Henke';
        const func = () => {
            return 'Hello ' + me;
        };

        me = 'Henke 2';

        expect(func()).toEqual('Hello Henke 2');
    });

    it('should understand that even if doneCb is executed elsewhere, like inside dowork, it still has access to variable me', done => {
        const doWork = (doneCb) => {
            // ...
           expect(doneCb()).toEqual('Foo');
           done();
        };

        const me = 'Foo';

        const doneCb = () => { 
            return me;
        };

        doWork(doneCb);
    });

});
