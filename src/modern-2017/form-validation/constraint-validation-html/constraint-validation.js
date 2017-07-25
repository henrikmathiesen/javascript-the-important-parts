(function () {

    var isDateSupported = function () {
        // if browser sanatize the value, it means date is supported

        var input = document.createElement('input')
        var value = 'a';

        input.setAttribute('type', 'date');
        input.setAttribute('value', value);

        return input.value !== value;
    }

    if (isDateSupported()) {
        // works well in older browsers
        document.documentElement.className += 'ip-form-date-is-supported';
    }

})();
