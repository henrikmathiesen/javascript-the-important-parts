// TODO

describe('ES6 - the spread operator', () => {
    it('should get a feel for it', () => {
        const numsA = [1, 2, 3];
        const numsB = [4, 5, 6];
        const nums = [...numsA, 0, ...numsB];

        expect(nums).toEqual([1, 2, 3, 0, 4, 5, 6]);
    });

    it('can be used in function calls', () => {
        const func = (x, y) => {
            return x + y;
        };

        const nums = [1, 2]
        expect(func(...nums)).toEqual(3);
    });

    it('should know that slice can be used to copy an array', () => {
        const arr01 = ['adam', 'bertil'];
        const arr02 = arr01.slice();

        expect(arr01).toEqual(['adam', 'bertil']);      // first array is unmodified (slice does not modify the original array)
        expect(arr02).toEqual(arr01);                   // arr01 is copied over
        expect(arr02).not.toBe(arr01);                  // they are however not the same instance
    });

    it('should know that spread can be used to copy an array', () => {
        const arr01 = ['adam', 'bertil'];
        const arr02 = [...arr01];

        expect(arr01).toEqual(['adam', 'bertil']);      // first array is unmodified (slice does not modify the original array)
        expect(arr02).toEqual(arr01);                   // arr01 is copied over
        expect(arr02).not.toBe(arr01);                  // they are however not the same instance
    });

    it('should know that with both the above methods only the first level is copied, deeper levels are still references', () => {
        const a = [[1], [2], [3]];
        const b = [...a];

        const one = b.shift().shift();
        expect(one).toEqual(1);

        expect(a).not.toEqual([[1], [2], [3]]);         // first array is affected
        expect(a).toEqual([[], [2], [3]]);
    });

    // the problem with deeper levels are references is also true for concat()
    // const a = [[1], [2], [3]];
    // const b = [].concat(a);
    // https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript

});
