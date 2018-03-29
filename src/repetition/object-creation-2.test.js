describe('Repetition 2 - object creation', () => {

    describe('Object.create and shared properties', () => {

        const base = {
            title: '',
            reviews: [],
            score: 0,
            calculateAvrageScore: function () {
                let score = 0;

                this.reviews.forEach((review) => {
                    score += review.score;
                });

                this.score = score / this.reviews.length;
            }
        }

        const book = Object.create(base);
        const game = Object.create(base);

        book.title = 'Brothers Grim';
        game.title = 'Fallout';

        book.reviews.push({ score: 10 }, { score: 10 });
        game.reviews.push({ score: 2 }, { score: 2 });


        it('should know that value types are local to each instance', () => {
            expect(book.title).toEqual('Brothers Grim');
            expect(game.title).toEqual('Fallout');
        });

        it('should know that reference types are not', () => {
            expect(book.reviews.length).not.toBe(2); // {score:10},{score:10},{score:2},{score:2}
            expect(game.reviews.length).not.toBe(2); // {score:10},{score:10},{score:2},{score:2}
        });

        it('should know that this obviously messes up calculateAvrageScore', () => {
            book.calculateAvrageScore();
            game.calculateAvrageScore();

            expect(book.score).not.toEqual(10);
            expect(game.score).not.toEqual(2);
        });

        // This seems kind of strange ...

    });

    describe('ES6 class', () => {

        class Base {
            constructor() {
                this.title = '';
                this.reviews = [];
                this.score = 0;
            }

            calculateAvrageScore() {
                let score = 0;

                this.reviews.forEach((review) => {
                    score += review.score;
                });

                this.score = score / this.reviews.length;
            }
        }

        const book = new Base();
        const game = new Base();

        book.title = 'Brothers Grim';
        game.title = 'Fallout';

        book.reviews.push({ score: 10 }, { score: 10 });
        game.reviews.push({ score: 2 }, { score: 2 });

        it('should know that value types are local to each instance', () => {
            expect(book.title).toEqual('Brothers Grim');
            expect(game.title).toEqual('Fallout');
        });

        it('should know that reference types are also local to each instance', () => {
            expect(book.reviews.length).toBe(2);
            expect(game.reviews.length).toBe(2);
        });

        it('should calculate avarage score', () => { 
            book.calculateAvrageScore();
            game.calculateAvrageScore();

            expect(book.score).toEqual(10);
            expect(game.score).toEqual(2);
        });

        // This seems more reasonable

    });

});
