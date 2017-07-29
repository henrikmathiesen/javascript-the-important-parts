// Webpack and Babel should NOT mess with this file

describe('something', () => {
    it('does some ES6 stuff', () => {
        const myArray = ['adam', 'bertil'];
        const [adam] = myArray;

        expect(adam).toEqual('adam');
    });
});
