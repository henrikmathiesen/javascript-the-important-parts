(function () {

    // https://caniuse.com/#feat=addeventlistener
    // https://caniuse.com/#feat=domcontentloaded

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    // SUPPORTS: event.preventDefault(), stopPropagation(), defaultPrevented

    // https://stackoverflow.com/questions/16512016/event-listener-in-elements-appended-after-dom-content-loaded

    var domReady = function () {

        //
        // Static Content

        var $staticButton = document.querySelector('.js-static-button');
        $staticButton.addEventListener('click', function () {
            console.log('$staticButton CLICKED');
        });

        //
        // Dynamic Content

        var dynamicButton = '<button type="button" class="js-dynamic-button">One Dynamic Button</button>';
        var $injectDynamicTo = document.querySelector('.js-inject-button');
        $injectDynamicTo.innerHTML = dynamicButton;

        var $dynamicButton = document.querySelector('.js-dynamic-button');
        $dynamicButton.addEventListener('click', function (event) {
            console.log('$dynamicButton CLICKED', event);
        });

        //
        // Dynamic Content, delayed, simulating an Ajax Call

        setTimeout(function () {
            var ajaxButton = '<button type="button" class="js-ajax-button">One Ajax Button</button>';
            var $injectAjaxTo = document.querySelector('.js-ajax-inject-button');
            $injectAjaxTo.innerHTML = ajaxButton;
        }, 1000);


        var $staticParent = document.querySelector('.js-ajax-inject-button');
        $staticParent.addEventListener('click', function (event) {
            var target = event.target;
            var $button = document.querySelector('.js-ajax-button');

            if (target === $button) {
                console.log('$ajaxButton clicked!');
            }
        });

    };

    document.addEventListener('DOMContentLoaded', domReady);
})();
