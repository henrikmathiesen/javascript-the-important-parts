describe('Composition over Inheritance - focus on what the types do, not what they are', () => {

    describe('We first look at inheritance - that focuses on what types are', () => {

        describe('Animals and Robots', () => {
            class Animal {
                poop() {
                    return 'poop';
                }
            }

            class Dog extends Animal {
                bark() {
                    return 'woff';
                }
            }

            class Cat extends Animal {
                meow() {
                    return 'meow';
                }
            }

            class Robot {
                drive() {
                    return 'drive';
                }
            }

            class CleaningRobot extends Robot {
                clean() {
                    return 'clean';
                }
            }

            class MurderRobot extends Robot {
                kill() {
                    return 'kill';
                }
            }

            it('should work as expected', () => {
                const cat = new Cat();
                const dog = new Dog();
                const cleaningRobort = new CleaningRobot();
                const murderRobot = new MurderRobot();

                expect(cat.meow()).toEqual('meow');
                expect(cat.poop()).toEqual('poop');

                expect(dog.bark()).toEqual('woff');
                expect(dog.poop()).toEqual('poop');

                expect(cleaningRobort.drive()).toEqual('drive');
                expect(cleaningRobort.clean()).toEqual('clean');

                expect(murderRobot.drive()).toEqual('drive');
                expect(murderRobot.kill()).toEqual('kill');
            });
        });

        describe('It will not be so strait forward to create a murder robot dog that can: kill, drive and bark', () => {
            class Animal {
                poop() {
                    return 'poop';
                }
            }

            class Dog extends Animal {
                bark() {
                    return 'woff';
                }
            }

            class Cat extends Animal {
                meow() {
                    return 'meow';
                }
            }

            class Robot {
                drive() {
                    return 'drive';
                }
            }

            class CleaningRobot extends Robot {
                clean() {
                    return 'clean';
                }
            }

            class MurderRobot extends Robot {
                kill() {
                    return 'kill';
                }
            }

            // lets try it (we can however only extend one class)

            class MurderRobotDog extends MurderRobot {

            }

            it('should be able to kill, drive and bark', () => {
                const murderRobotDog = new MurderRobotDog();
                expect(murderRobotDog.kill).toBeDefined();
                expect(murderRobotDog.drive).toBeDefined();
                expect(murderRobotDog.bark).not.toBeDefined();          // we can not bark
            })
        });

        describe('Creating a murder robot dog that can: kill, drive and bark can be done - A', () => {
            // this works but is kind of confusing
            class GameObject {
                bark() {
                    return 'woff';
                }
            }

            class Animal extends GameObject {
                poop() {
                    return 'poop';
                }
            }

            class Dog extends Animal {

            }

            class Cat extends Animal {
                meow() {
                    return 'meow';
                }
            }

            class Robot extends GameObject {
                drive() {
                    return 'drive';
                }
            }

            class CleaningRobot extends Robot {
                clean() {
                    return 'clean';
                }
            }

            class MurderRobot extends Robot {
                kill() {
                    return 'kill';
                }
            }

            // lets try it (we can however only extend one class)

            class MurderRobotDog extends MurderRobot {

            }

            it('should be able to kill, drive and bark', () => {
                const murderRobotDog = new MurderRobotDog();
                expect(murderRobotDog.kill).toBeDefined();
                expect(murderRobotDog.drive).toBeDefined();
                expect(murderRobotDog.bark).toBeDefined();
            })
        });

        describe('Creating a murder robot dog that can: kill, drive and bark can be done - B', () => {
            class Animal {
                poop() {
                    return 'poop';
                }
            }

            class Dog extends Animal {
                bark() {
                    return 'woff';
                }
            }

            class Cat extends Animal {
                meow() {
                    return 'meow';
                }
            }

            class Robot {
                drive() {
                    return 'drive';
                }
            }

            class CleaningRobot extends Robot {
                clean() {
                    return 'clean';
                }
            }

            class MurderRobot extends Robot {
                kill() {
                    return 'kill';
                }
            }

            // lets try it (we can however only extend one class)

            class MurderRobotDog extends MurderRobot {
                // this works, but bark is now duplicated here and in the Dog class
                bark() {
                    return 'woff';
                }
            }

            it('should be able to kill, drive and bark', () => {
                const murderRobotDog = new MurderRobotDog();
                expect(murderRobotDog.kill).toBeDefined();
                expect(murderRobotDog.drive).toBeDefined();
                expect(murderRobotDog.bark).toBeDefined();
            })
        });
    });

    describe('We then look at composition - that focuses on what types do', () => {
        /*
            dog             = barker, pooper
            cat             = meower, pooper
            cleaningRobot   = driver, cleaner
            murderRobot     = driver, killer
            murderRobotDog  = driver, killer, barker
        */

        // parentheses is used ({}) so object is auto returned
        const barker = state => ({
            bark: () => 'woff I am ' + state.name
        });

        const driver = state => ({
            drive: () => state.position = state.position + state.speed
        });

        const killer = state => ({
            kill: () => 'on the mission'
        });

        it('should be a murderRobotDog that should be able to kill, drive and bark', () => { 
            const murderRobotDog = (name) => {
                let state = {
                    name,
                    speed: 100,
                    position: 0
                }

                // ES6 feature (lodash has it also)
                return Object.assign(
                    {},
                    barker(state),
                    driver(state),
                    killer(state)
                );
            };

            expect(murderRobotDog('Sniffles').kill).toBeDefined();
            expect(murderRobotDog('Sniffles').drive).toBeDefined();
            expect(murderRobotDog('Sniffles').bark).toBeDefined();
        });
    });
});
