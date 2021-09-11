// See also my-app > order-search-result.ts

// The winner!

const searchResultData = require('./order-search-result-data');

describe('order-search-result-v1 - Ranks whole words heigher', () => {

    let set01 = [];
    let set02 = [];

    beforeEach(() => {
        set01 = searchResultData.getSet01();
        set02 = searchResultData.getSet02();
    });

    const search = (set, query) => {

        query = query.toLowerCase();

        const weightWord = (phrase) => {
            if (phrase.indexOf(query) === 0) {
                return 0;
            }

            const words = phrase.split(/\/| /);

            let wordIndex = words.length;
            let letterIndex = phrase.length;

            words.forEach((word, i) => {
                const index = word.indexOf(query);
                if (index > -1 && index < letterIndex) {
                    letterIndex = index;
                    wordIndex = i;
                }
            });

            return 1 + wordIndex + letterIndex * 100;
        };

        const sortOnMatch = (a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();

            const wA = weightWord(a);
            const wB = weightWord(b);

            if (wA > wB) {
                return 1;
            } else if (wA === wB && a > b) {
                return 1;
            } else {
                return -1;
            }
        }

        const result = set.filter(s => s.toLowerCase().indexOf(query) > -1);
        return result.sort(sortOnMatch);
    }

    it('should sort - 1', () => {
        const result = search(set01, 'Äpple');

        expect(result.length).toBe(7);
        expect(result[0]).toBe('äpple');                          // Best match (also not case sensitive)
        expect(result[1]).toBe('Äpple under trädet');             // Ranks whole words heigher
        expect(result[2]).toBe('Äpplemask');                      // a comes before o
        expect(result[3]).toBe('Äpplemos');                       // o comes after a
        expect(result[4]).toBe('Äpplemäsk');                      // ä is working as expected, when ordered
        expect(result[5]).toBe('Äppleträd');                      // t comes after m
        expect(result[6]).toBe('Kalles äpple');                   // "Ranks whole words heigher", but this is last, hmm...

        expect(set01.length).not.toBe(7);                         // original set not mutated
    });

    it('should sort - 2', () => { 
        const result = search(set02, 'Äpple');

        expect(result.length).toBe(4);

        expect(result[0]).toBe('Äpplegryta');                      // g comes before t
        expect(result[1]).toBe('Äpplets väg');                     // t comes after g
        expect(result[2]).toBe('Peppäpple');                       // äpple is earlier in phrase
        expect(result[3]).toBe('Galantäpple');                     // äpple is later in phrase
    });

});
