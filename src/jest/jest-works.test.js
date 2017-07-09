const Person = require('./Person'); // commonJs actually works in Jest without plugins (ES6 modules does not work however)

describe('jest should test our code in here (no babel needed yet!)', () => {

    it('can do a simple unit test', () => {
        expect(true).toEqual(true);
    });

    it('can test DOM without additional plugins', () => {
        const div01 = '<div class="foo">1</div>';
        const div02 = '<div class="foo">2</div>';
        document.body.innerHTML = div01 + div02;

        const matches = document.querySelectorAll('.foo');
        const match = document.querySelector('.foo');

        expect(matches.length).toEqual(2);
        expect(typeof match === 'object').toEqual(true);
    });

    it('supports ES6 features without additional plugins', () => {
        const foo = [1, 2, 3];
        const bar = [...foo, 4, 5, 6];
        const baz = `Well the answer is ${1+1}`;
        const person01 = new Person('Adam');
        const person02 = new Person('Bertil');

        expect(bar).toEqual([1, 2, 3, 4, 5, 6]);
        expect(baz).toEqual('Well the answer is 2');
        expect(person01.getName()).toEqual('ADAM');
        expect(person02.getName()).toEqual('BERTIL');
    });

    it('can test callback code in a reliable way', done => {
        // https://facebook.github.io/jest/docs/en/asynchronous.html#callbacks

        const callback = data => {
            expect(data).toEqual('bar');
            done(); // important
        };

        const doWork = doneCb => {
            // ...
            doneCb('bar');
        };

        doWork(callback);
    });

    // TODO: promises: https://facebook.github.io/jest/docs/en/asynchronous.html#promises
});
