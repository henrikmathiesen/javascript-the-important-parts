describe('Legacy - constructors, prototypes and the new keyword.', () => {

    it('should know that a constructor function is just a regular function that we use the new keyword on', () => {
        function Vehicle() {

        }

        const vehicle = new Vehicle();

        expect(vehicle).toEqual({});
        expect(vehicle.constructor).toEqual(Vehicle);
        expect(Vehicle.prototype).toEqual(vehicle);
        expect(vehicle instanceof Vehicle).toEqual(true);

        // The underlying, built in constructor property is something you can’t set manually. It can only be set for you, as part of construction with the new keyword.
    });

    it('should know that a function can have properties and when an object is constructed with new, it inherits those properties', () => {
        function Vehicle() {

        }

        Vehicle.prototype.wheelCount = 4;

        const vehicle = new Vehicle();

        expect(vehicle.wheelCount).toEqual(4);
    });

    it('should know that we can change the constructor functions properties and that is reflected in the objects', () => {
        function Vehicle() {

        }

        Vehicle.prototype.wheelCount = 4;

        const vehicle = new Vehicle();

        expect(vehicle.wheelCount).toEqual(4);

        Vehicle.prototype.wheelCount = 6;

        expect(vehicle.wheelCount).toEqual(6);
    });

    it('should know that we can override the constructor functions properties', () => {
        function Vehicle() {

        }

        Vehicle.prototype.wheelCount = 4;

        const vehicle01 = new Vehicle();

        expect(vehicle01.wheelCount).toEqual(4);

        Vehicle.prototype.wheelCount = 6;

        expect(vehicle01.wheelCount).toEqual(6);

        const vehicle02 = new Vehicle();
        vehicle02.wheelCount = 8;

        expect(vehicle01.wheelCount).toEqual(6);
        expect(vehicle02.wheelCount).toEqual(8);
    });

    it('should know that we can have a sort of subclassing - but there is one problem', () => {
        // Class definition / constructor
        function Vehicle(color) {
            // Initialization
            this.color = color;
        }

        // Instance methods
        Vehicle.prototype = {
            go: function go() {
                return 'Vroom!';
            }
        }

        // sub class
        function Car() {

        };

        Car.prototype = new Vehicle('tan');

        Car.prototype.honk = function honk() { return 'BEEP!' };

        var car = new Car();

        expect(car.go()).toEqual('Vroom!');
        expect(car.honk()).toEqual('BEEP!');
        expect(car.color).toEqual('tan');
        expect(car instanceof Car).toEqual(true);
        expect(car instanceof Vehicle).toEqual(true);

        /*
            Now, there’s a problem here. The Vehicle constructor only gets called once, to set up Car‘s prototype. 
            We need to give it a color there. We can’t make different cars have different colors, which is not ideal.
        */
    });

    it('should know that we can fix the problem', () => {
        function Vehicle(color) {
            this.color = color;
        }

        Vehicle.prototype = {
            go: function go() {
                return "Vroom!";
            }
        }

        function Car(color) {
            Vehicle.call(this, color);
        };

        Car.prototype = new Vehicle();

        Car.prototype.honk = function honk() { return 'BEEP!' };

        const car01 = new Car('red');
        const car02 = new Car('blue');

        expect(car01.go()).toEqual('Vroom!');
        expect(car01.honk()).toEqual('BEEP!');
        expect(car01 instanceof Car).toEqual(true);
        expect(car01 instanceof Vehicle).toEqual(true);
        expect(car01.color).toEqual('red');                                 // red

        expect(car02.go()).toEqual('Vroom!');
        expect(car02.honk()).toEqual('BEEP!');
        expect(car02 instanceof Car).toEqual(true);
        expect(car02 instanceof Vehicle).toEqual(true);
        expect(car02.color).toEqual('blue');                                // blue
    });

});
