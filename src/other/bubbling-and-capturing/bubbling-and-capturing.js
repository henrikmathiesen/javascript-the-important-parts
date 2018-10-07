(function () {

    // https://javascript.info/bubbling-and-capturing
    // event.target – is the “target” element that initiated the event, it doesn’t change through the bubbling process
    // this – is the one element that has a currently running handler on it

    // Capturing phase is rarely used. Normally it is invisible to us.

    //
    // Bubbling

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

    //
    // Capturing (default false)

    var $capturing01 = document.querySelector('.js-capturing-01');
    var $capturing02 = document.querySelector('.js-capturing-02');

    $capturing01.addEventListener('click', function () {
        console.log('js-capturing-01 clicked');
    }, true);

    $capturing02.addEventListener('click', function () {
        console.log('js-capturing-02 clicked');

        // a click on inner selector results in
        // js-capturing-02 clicked (inner event handler)
        // js-capturing-01 clicked (outer event handler)

        // IF we set capture to true in outer event handler, it runs first
        // js-capturing-01 clicked (outer event handler)
        // js-capturing-02 clicked (inner event handler)
    });

})();
