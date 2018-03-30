import Game from '../models/game.model';
import IHasInfo from '../models/has-info.interface';

const game01 = new Game();
game01.name = 'Red Dead Redemption';
// We dont need to populate more properties on this instance

const game02 = <Game> {
    name: 'Red Dead Redemption'
};
// We dont need to populate more properties on this object

const info = <IHasInfo> {
    name: 'Adam'
}
// We dont need to populate more properties on this object

class Information implements IHasInfo {
    name: string;
    age: number;
}
// We do need to implement the properties
