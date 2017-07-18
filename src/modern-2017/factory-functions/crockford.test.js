describe('This is how Douglas Crockford creates objects', () => {

    it('should demonstrate', () => {

        function constructor(spec) {
            const { member } = spec;

            const method = function () { 
                // have access to member
                return 'ok ' + member;
            };

            return Object.freeze({
                method
            });
        }

        const constr01 = constructor({ name: 'foo', member: 'foo' });
        const constr02 = constructor({ name: 'bar', member: 'bar' });

        expect(constr01.method()).toEqual('ok foo');
        expect(constr02.method()).toEqual('ok bar');

        expect(constr01).not.toBe(constr02);

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

        /*
            Yes, we would preserve memory by using prototype inheritence, since objects can share the method
            But it is not relevant on todays devices.

            Benefits
            - There is no worry that some code somewhere changes the prototype (that will effect all objects that delegates to the prototype)
            - There is no this
            - It is clean and will execute fast. 
            - There is very little confusion.
        */
    });

});
