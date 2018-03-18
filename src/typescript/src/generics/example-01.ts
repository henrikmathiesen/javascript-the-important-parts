import Game from '../models/game.model';

//
// We do not have any type checking, it is typed any

function identity(arg){
    return arg;
}

identity('henry').length;

//
// Generics, we now have type checking

function genericIdentity<T>(arg: T): T {
    return arg;
}

genericIdentity<string>('henry').length;
genericIdentity<number>(123).toString();

// We dont need to specify <string>, the compiler will figure out the type
genericIdentity('foo');

const game = new Game();
game.name = 'Fallout';
game.rating = 9;

genericIdentity(game).name;

console.log(genericIdentity(game.name));
