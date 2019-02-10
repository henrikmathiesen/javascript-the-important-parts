/*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

    # OBJECT

    const dog = {
        sound: 'woff'
        talk: function(){
            return this.sound;                  // working, this points to dog
        }
    };

    const cat = {
        sound: 'mow',
        talk: () => this.sound                  // not working, this points to the global object
    };


    # TYPESCRIPT

    class Dog {
        private sound = 'woff';

        talk() {
            return this.sound;
        }

        getThis() {
            return this;
        }                                       // working, this points to the object, when doing new Dog()
    }

    class Cat {
        private sound = 'mow';

        talk = () => this.sound;

        getThis = () => this;
    }                                           // working, this points to the object here also, when doing new Cat()


    # TYPESCRIPT EVENTS

    ANGULAR EVENTS (see angular-x-rxjs6-plus)
    
    When doing an Angular app and using (click) from a template, then it doesnt matter if we do
    talk() {  } or talk = () => , in both cases this points to the object

    ANGULAR MANUAL BINDING IN THE COMPONENT CLASS

    If doing this in a class method, TypeScript complains that this.msg does not exist. This points to the button and not to the object
    manual1.addEventListener('click', function () {
            console.log(this.msg);
    });

    When doin this, TypeScript will not complain, but msg is undefined inside onManual1Click. Again this points to the button.
    manual1.addEventListener('click', this.onManual1Click);

    Doing this in the constructor fixes the problem 
    this.onManual1Click = this.onManual1Click.bind(this);

    If doing this in a class method then it works
    manual2.addEventListener('click', () => console.log(this.msg));

    Likewise this works if onManual2Click is an arrow function (like talk above)
    manual2.addEventListener('click', this.onManual2Click);

*/
