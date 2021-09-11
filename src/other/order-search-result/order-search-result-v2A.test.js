// See also my-app > order-search-result.ts

const searchResultData = require('./order-search-result-data');

describe('order-search-result-v2A - Ranks match earliest in phrase heigher (but no second ordering, like alphabetically)', () => {

    let set01 = [];
    let set02 = [];

    beforeEach(() => {
        set01 = searchResultData.getSet01();
        set02 = searchResultData.getSet02();
    });

    const search = (set, query) => {
        query = query.toLowerCase();

        const getOccurrence = (s) => {
            const position = s.toLowerCase().indexOf(query);
            return position < 0 ? 1000 : position;
        };

        const result = set.filter(s => s.toLowerCase().indexOf(query) > -1);

        return result.sort((a, b) => {
            return getOccurrence(a) - getOccurrence(b);
        });
    }

    it('should sort - 1', () => {
        const result = search(set01, 'Äpple');

        expect(result.length).toBe(7);
        expect(result[0]).toBe('Äppleträd');                       // Hmm ...
        expect(result[1]).toBe('Äpplemos');
        expect(result[2]).toBe('äpple');
        expect(result[3]).toBe('Äpplemask');
        expect(result[4]).toBe('Äpplemäsk');
        expect(result[5]).toBe('Äpple under trädet');
        expect(result[6]).toBe('Kalles äpple');

        expect(set01.length).not.toBe(7);                         // original set not mutated
    });

    it('should sort - 2', () => { 
        const result = search(set02, 'Äpple');

        expect(result.length).toBe(4);
        expect(result[0]).toBe('Äpplets väg');                  // Hmm ...
        expect(result[1]).toBe('Äpplegryta');                   // Hmm ...
        expect(result[2]).toBe('Peppäpple');                    // Äpple is earlier in phrase
        expect(result[3]).toBe('Galantäpple');                  // Than here
    });

});
