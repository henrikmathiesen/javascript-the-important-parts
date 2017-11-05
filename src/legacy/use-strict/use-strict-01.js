var test01 = 'Iam on the window object';
console.log(window.test01);

test02 = 'Iam also on the window object';
console.log(window.test02);

function test03() { }
console.log(window.test03); // Also on the window object

(function () { 
    var test04 = 'I will NOT be on the window object';
    console.log(window.test04);

    test05 = 'I will be on the window object --- EVEN THOUGH we have a function scope';
    console.log(window.test05);
})();
