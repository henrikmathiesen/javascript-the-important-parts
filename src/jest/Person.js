class Person {
    constructor(name) {
        this._name = name;
    }

    getName() {
        return this._name.toUpperCase();
    }
}

module.exports = Person;
