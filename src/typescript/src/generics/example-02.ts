//
// This functionality only works on strings, if we want it to work on other types we have to use type any but that comes with problems, we dont get type safety

class ListStrings {

    private items: string[];

    constructor() {
        this.items = [];
    }

    add(item: string) {
        this.items.push(item);
    }

    get(index: number) {
        return this.items[index];
    }

}

//
// This functionality works with many types

class ListGenerics<T> {

    private items: T[];

    constructor() {
        this.items = [];
    }

    add(item: T) {
        this.items.push(item);
    }

    get(index: number) {
        return this.items[index];
    }

}

// We need to specify what T is, else things get strange (for example it will not be clear what .get returns)
const list01 = new ListGenerics<string>();
list01.add('Henke');
console.log(list01.get(0));
