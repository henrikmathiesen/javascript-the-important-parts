'use strict'

var testA = 'Iam on the window object';
console.log(window.testA);

//testB = 'Uncaught ReferenceError: testB is not defined';
//console.log(window.testB);

function testC() { }
console.log(window.testC); // Also on the window object in strict mode

(function () { 
    var testD = 'I will NOT be on the window object in strict mode either';
    console.log(window.testD);

    //testE = 'Uncaught ReferenceError: testE is not defined';
    //console.log(window.testE);
})();
