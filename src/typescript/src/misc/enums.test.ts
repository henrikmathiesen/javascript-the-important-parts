export enum DatesRangeEnum {
    day = 'day',
    month = 'month',
    year = 'year'
}

// can not get member as string when using these ^
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html

export enum StegEnum {
    steg1 = 1,
    steg2 = 2,
    steg3 = 3
}

describe('get member as string or number', () => {

    it('should not be able to get string enums properties as string, by passing in a number', () => {
        expect(DatesRangeEnum[1]).toBe(undefined);
        expect(DatesRangeEnum[DatesRangeEnum.day]).toBe('day');         // this however works, but why would one do that?
    });

    it('should not be able to get string enums properties as number, by passing in a string', () => {
        expect(DatesRangeEnum['day']).not.toBe(1);                      // recieves 'day' here
        expect(DatesRangeEnum[DatesRangeEnum.day]).not.toBe(1);         // still recieves 'day' here
    });

    it('should be able to get standard enums properties as string, by passing in a number', () => {
        expect(StegEnum[1]).toBe('steg1');
        expect(StegEnum[StegEnum.steg1]).toBe('steg1');
    });

    it('should be able to get standard enums properties as number, by passing in a string', () => { 
        expect(StegEnum['steg1']).toBe(1);
    });

});
