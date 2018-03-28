import Review from '../models/review.model';
import Game from '../models/game.model';
import Book from '../models/book.model';
import IHasReviews from '../models/has-reviews.interface';

class CacheReviewsForEntityGenerics<T extends IHasReviews> {
    private reviews: Review[];

    constructor(private entity: T) {
        this.reviews = entity.reviews;
    }

    getEntity(){
        // A1)

        if(this.entity instanceof Game) {
            console.log('this.entity instanceof Game: true', this.entity.name);
        }

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

const cache01 = new CacheReviewsForEntityGenerics<Game>(game);
const cache02 = new CacheReviewsForEntityGenerics<Book>(book);

// Logic knows return type since we are using generics, thats good
cache01.getEntity().name;
//cache02.getEntity().name; , Book does not have a name

// A2) But maybe we want to know it INSIDE the methods on the class
