// See also my-app > order-search-result.ts

const searchResultData = require('./order-search-result-data');

describe('order-search-result-v1', () => {

    let set01 = [];
    let set02 = [];

    beforeEach(() => { 
        set01 = searchResultData.getSet01();
        set02 = searchResultData.getSet02();
    });

    it('should run', () => {

        console.log(set01);

    });

});
