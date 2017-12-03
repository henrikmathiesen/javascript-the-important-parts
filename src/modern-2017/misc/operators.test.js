describe('We need some refreshing and labbing with these', () => {

    describe('The || operator', () => {
        it('should know the || operator as fallback for falsy value -- A1', () => {
            const name = '';
            const printName = name || 'Anonymous';

            expect(printName).toEqual('Anonymous');
        });

        it('should know the || operator as fallback for falsy value -- A2', () => {
            const name = 'Kalle';
            const printName = name || 'Anonymous';

            expect(printName).toEqual('Kalle');
        });

        it('should know the || operator as fallback for falsy value -- B1', () => {
            var person = {};
            const printName = person.name || 'Anonymous';

            expect(printName).toEqual('Anonymous');
        });

        it('should know the || operator as fallback for falsy value -- B2', () => {
            var person = { name: 'Kalle' };
            const printName = person.name || 'Anonymous';

            expect(printName).toEqual('Kalle');
        });
    });

    describe('The && operator', () => {
        it('should know the && operator as a condition -- A1', () => {
            const name = '';
            const printSomething = name && 'something';

            expect(printSomething).toEqual('', 'Since left hand is falsy it will be picked');
        });

        it('should know the && operator as a condition -- A2', () => {
            const name = 'Kalle';
            const printSomething = name && 'something';

            expect(printSomething).toEqual('something', 'Since left hand is truthy, right hand it will be picked');
        });

        it('should know the && operator as a condition -- B1', () => {
            const getAdminHeader = () => `<h1>Welcome Great Admin</h1>`;
            const isAdmin = false;
            const markup = isAdmin && getAdminHeader();

            expect(markup).toEqual(false, 'contains NO markup');
        });

        it('should know the && operator as a condition -- B2', () => {
            const getAdminHeader = () => `<h1>Welcome Great Admin</h1>`;
            const isAdmin = true;
            const markup = isAdmin && getAdminHeader();

            expect(markup).toEqual('<h1>Welcome Great Admin</h1>', 'contains markup');
        });

        it('should do case B in a better way for a template', () => { 
            const getAdminHeader = () => `<h1>Welcome Great Admin</h1>`;
            const isAdmin = false;
            const markup = isAdmin ? getAdminHeader() : '';

            expect(markup).toEqual('', 'contains NO markup');
        });
    });

});
