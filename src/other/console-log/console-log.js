// log the names of objects

const foo = { name: 'Adam', age: 30 };
const bar = { name: 'Bertil', age: 40 };

// bad (we dont see the name of the objects)
console.log(foo);
console.log(bar);

// good
console.log({ foo, bar });

// we can also do this
console.log('%c My friends', 'color:orange');
console.log({ foo, bar });

// the objects share common properties, so we could display them as a table
console.table([foo, bar]);

// timing something

console.time('looper');

for(let i = 1; i <= 5; i++) {
    console.log(i);
}

console.timeEnd('looper');

// trace, will log 2 thing: where it was defined (or rather where the .trace() is) and where it was called

const f = () => {  
    // do some stuff
    console.trace('the f function');
};

f();
