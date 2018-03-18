import Review from '../models/review.model';
import Game from '../models/game.model';
import Book from '../models/book.model';
import IHasReviews from '../models/has-reviews.interface';

// A1) We get typing by doing this, but we can not hold type info of what entity is used as constructor parameter
class CacheReviewsForEntity {

    private reviews: Review[];

    constructor(private entity: IHasReviews) {
        this.reviews = entity.reviews;
    }

    getEntity(){
        return this.entity;
    }
}

// B1) We get the same benefit as above, but we also get info about the entity used as constructor parameter
class CacheReviewsForEntityGenerics<T extends IHasReviews> {
    private reviews: Review[];

    constructor(private entity: T) {
        this.reviews = entity.reviews;
    }

    getEntity(){
        return this.entity;
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

const cache01 = new CacheReviewsForEntity(game);
const cache02 = new CacheReviewsForEntity(book);

// A2) cache01.getEntity().name , we get compile error

const cache03 = new CacheReviewsForEntityGenerics<Game>(game);
const cache04 = new CacheReviewsForEntityGenerics<Book>(book);

// B2) We get NO compile error
cache03.getEntity().name;
