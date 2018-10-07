(function () {

    // https://javascript.info/bubbling-and-capturing
    // event.target – is the “target” element that initiated the event, it doesn’t change through the bubbling process
    // this – is the one element that has a currently running handler on it

    var $bubbling = document.querySelector('.js-bubbling');
    $bubbling.addEventListener('click', function (event) {
        console.log('.js-bubbling clicked', event.target, this);
    });

    var $bubbling01 = document.querySelector('.js-bubbling-multiple-01');
    var $bubbling02 = document.querySelector('.js-bubbling-multiple-02');

    $bubbling01.addEventListener('click', function (event) { 
        console.log('.js-bubbling-multiple-01 clicked', event.target);
    });

    $bubbling02.addEventListener('click', function (event) { 
        console.log('.js-bubbling-multiple-02 clicked', event.target);
        
        // event.stopPropagation(); , will stop $bubbling01 from running
        // event.stopImmediatePropagation(), as above but will also stop any other handler on the same element from running
    });

})();
