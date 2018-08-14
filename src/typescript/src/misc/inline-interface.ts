class AnimalModel {
    name: string;
    properties: { a: number, b: number };               // interface
}

class Bar {

    getPerson(): { name: string, age: number } {        // interface
        return {                                        // following the interface when returning
            name: 'Adam',
            age: 55
        }
    }

    getAnimal01(): AnimalModel {
        return {                                        // following the interface when returning
            name: 'Fluffy',
            properties: {
                a: 1,
                b: 2
            }
        }
    }

    getAnimal02(): AnimalModel {
        const animal = new AnimalModel();               // new
        animal.name = 'Morris';
        animal.properties = { a: 1, b: 3 };             // create object this way, following the interface

        return animal;
    }

}
