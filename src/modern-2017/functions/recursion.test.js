describe('Recursion - when a function calls itself until it doesnt', () => {

    it('should countdown from 10', () => {
        const numbers = [];

        const countdownFrom = (num) => {
            if (num === 0) {
                return;
            }
            numbers.push(num);
            countdownFrom(num - 1);
        }

        countdownFrom(10);

        expect(numbers.length).toEqual(10);
    });

    it('should understand that there are some instances where recursion is easier than a for loop', () => { 
        let categories = [
            {
                id: 'animals',
                parent: null
            },
            {
                id: 'mammals',
                parent: 'animals'
            },
            {
                id: 'cats',
                parent:'mammals'
            },
            {
                id: 'dogs',
                parent: 'mammals'
            },
            {
                id: 'labrador',
                parent: 'dogs'
            },
            {
                id: 'persian',
                parent: 'cats'
            },
            {
                id: 'siamese',
                parent: 'cats'
            }
        ];

        // console.log(JSON.stringify(categories, null, 2));

        // Lets say we need to make categories into this for a tree structure, for a menu
        /*
        const animals = {
            mammals: {
                dogs: {
                    labrador: null
                },
                cats: {
                    persian: null,
                    siamese: null
                }
            }
        };
        */

        const makeTree = (categories, parent) => {
            let node = {};

            categories
                .filter(c => c.parent === parent)
                .forEach(c => node[c.id] = makeTree(categories, c.id));

            return node;
        };

        console.log(JSON.stringify(makeTree(categories, null), null, 2));
    });

});
