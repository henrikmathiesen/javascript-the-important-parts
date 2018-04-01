import Game from '../models/game.model';
import IHasInfo from '../models/has-info.interface';
import IHasMoreInfo from '../models/has-more-info.interface'

const game01 = new Game();
game01.name = 'Red Dead Redemption';
// We dont need to populate more properties on this instance. To force that, use a constructor (see game.model).

const game02 = <Game> {
    name: 'Red Dead Redemption'
    // We dont need to populate more properties on this object, because we cast it
};

const game03: Game = {
    name: 'Fallout',
    rating: 10,
    reviews: []
    // We do need to populate all the properties on this object
}

const info01 = <IHasInfo> {
    name: 'Adam'
    // We dont need to populate more properties on this object, because we cast it
}

const info2: IHasInfo = {
    name: 'Adam',
    age: 44

    // We do need to populate all the properties on this object
}

class Information implements IHasInfo {
    name: string;
    age: number;
    // We do need to implement the properties
}

class MoreInformation implements IHasMoreInfo {
    name: string;
    age: number;
    shoeSize: number;
    // We do need to implement the properties from IHasMoreInfo that extends IHasInfo
}
