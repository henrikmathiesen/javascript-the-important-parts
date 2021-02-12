describe('date sanity check', () => {

    // We check that a user has not given us a date like 20190475 or 20191301
    // We are going to test with a regex and with logic
    // I think regex will work to an extent, BUT it will not be able to catch leap years where 29 feb is ok

    // The provided date should be in format yyyy-MM-dd or yyyyMMdd

    //
    // Utility function

    const removeDashes = v => v.replace(/-/g, '');

    //
    // Regex checker (alternative 1)

    const rc = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

    //
    // Logic checker (alternative 2)

    const lc = v => {
        const d = removeDashes(v);

        if (d.length !== 8) {
            return false;
        }

        const yearPart = d.slice(0, 4);
        const monthPart = d.slice(4, 6);
        const dayPart = d.slice(6, 8);

        const dateObj = new Date(`${yearPart}-${monthPart}-${dayPart}`);

        return dateObj.getFullYear() === +yearPart &&
            (dateObj.getMonth() + 1) === +monthPart &&
            dateObj.getDate() === +dayPart;
    }

    describe('test utility function', () => {
        it('should remove dashes - 1', () => {
            const d = '2019-04-13';
            const r = removeDashes(d);
            expect(r).toBe('20190413');
        });

        it('should remove dashes - 2', () => {
            const d = '20190413';
            const r = removeDashes(d);
            expect(r).toBe('20190413');
        });
    });

    describe('Regex checker (alternative 1)', () => {
        describe('Failing dates', () => {
            it('should not be valid - 1', () => {
                const d = '20191301';   // month 13
                const r = rc.test(d);
                expect(r).toBe(false);
            });

            it('should not be valid - 2', () => {
                const d = '20191232';   // 32:e dec
                const r = rc.test(d);
                expect(r).toBe(false);
            });

            it('should not be valid - 3', () => {
                const d = '20190229';   // 29:e feb
                const r = rc.test(d);
                expect(r).toBe(true);   // <--- PROBLEM: 29:e feb 2019 should NOT be ok
            });
        });
    });
    // We stop here with the regex alternative

    describe('Logic checker (alternative 2)', () => {
        describe('Failing dates', () => {
            it('should not be valid - 1', () => {
                const d = '20191301';   // month 13
                const r = lc(d);
                expect(r).toBe(false);
            });

            it('should not be valid - 2', () => {
                const d = '20191232';   // 32:e dec
                const r = lc(d);
                expect(r).toBe(false);
            });

            it('should not be valid - 3', () => {
                const d = '20190229';   // 29:e feb
                const r = lc(d);
                expect(r).toBe(false);
            });

            it('should not be valid - 4', () => {
                const d = '2021021X';
                const r = lc(d);
                expect(r).toBe(false);
            });
        });

        describe('Passing dates', () => {
            it('should be valid - 1', () => {
                const d = '20191201';
                const r = lc(d);
                expect(r).toBe(true);
            });

            it('should be valid - 2', () => {
                const d = '20191231';
                const r = lc(d);
                expect(r).toBe(true);
            });

            it('should be valid - 3', () => {
                const d = '20190228';
                const r = lc(d);
                expect(r).toBe(true);
            });

            it('should be valid - 4', () => {
                const d = '20000229';   // leap year, 29:e feb is ok
                const r = lc(d);
                expect(r).toBe(true);
            });

            it('should be valid - 5', () => { 
                const d = '2021-02-10';
                const r = lc(d);
                expect(r).toBe(true);
            });

            it('should be valid - 6', () => { 
                const d = '202102-10';  // dashes will be removed, so this is valid
                const r = lc(d);
                expect(r).toBe(true);
            });
        });
    });



});
