import Review from '../models/review.model';
import Game from '../models/game.model';
import Book from '../models/book.model';

interface IHasReviews {
    reviews: Review[];
}

class CacheReviewsForEntity<T extends IHasReviews> {

    private reviews: Review[];

    constructor(entity: T){
        this.reviews = entity.reviews;
    }

}

const game = new Game();
game.name = 'Fallout';
game.rating = 9;
game.reviews = new Array();

const review = new Review();
review.body = 'Good';
review.score = 9;
game.reviews.push(review);

const book = new Book();
book.reviews = new Array();
book.reviews.push(review);

const cache01 = new CacheReviewsForEntity<Game>(game);
const cache02 = new CacheReviewsForEntity<Book>(book);
