import IHasReviews from './has-reviews.interface';
import Review from './review.model';

class Game implements IHasReviews {
    name: string;
    rating: number;
    reviews: Review[];

    constructor(
        // public name: string,
        // public rating: number,
        // public reviews: Review[]
    ){

    }
}

export default Game;
