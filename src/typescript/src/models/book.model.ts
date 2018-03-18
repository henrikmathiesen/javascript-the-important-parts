import IHasReviews from './has-reviews.interface';
import Review from './review.model';

class Book implements IHasReviews {
    reviews: Review[];
}

export default Book;
