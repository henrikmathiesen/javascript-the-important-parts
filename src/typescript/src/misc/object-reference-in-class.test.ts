// file

class Foo {
    someObj = {
        name: 'Adam'
    };
}

declare var describe;
declare var it;
declare var expect;

describe('not same reference', () => {

    it('should not be the same reference', () => { 
        const foo01 = new Foo();
        const foo02 = new Foo();

        expect(foo01.someObj).not.toBe(foo02.someObj);
        expect(foo01.someObj === foo02.someObj).toBe(false);
    });

});


