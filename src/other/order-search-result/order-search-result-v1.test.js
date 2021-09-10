// See also my-app > order-search-result.ts

const searchResultData = require('./order-search-result-data');

describe('order-search-result-v1 - Ranks whole words heigher', () => {

    let set01 = [];
    let set02 = [];

    beforeEach(() => {
        set01 = searchResultData.getSet01();
        set02 = searchResultData.getSet02();
    });

    const weightWord = (phrase, query) => {
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

    const sortOnMatch = (query, a, b) => {
        query = query.toLowerCase();
        a = a.toLowerCase();
        b = b.toLowerCase();

        const wA = weightWord(a, query);
        const wB = weightWord(b, query);

        if (wA > wB) {
            return 1;
        } else if (wA === wB && a > b) {
            return 1;
        } else {
            return -1;
        }
    }

    const search = (set, query) => { 
        const result = set.filter(s => s.toLowerCase().indexOf(query.toLowerCase()) > -1);

        return result.sort((a, b) => {
            return sortOnMatch(query, a, b);
        });
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

        expect(set01[0]).not.toBe('äpple');                       // original set not mutated
    });

});
