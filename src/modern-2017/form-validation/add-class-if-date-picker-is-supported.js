(function () {

    'use strict';

    var thereIsAtLeastOneForm = document.getElementsByTagName('form').length > 0;

    if(!thereIsAtLeastOneForm) {
        return;
    }

    // if browser sanatizes the value, it means date is supported

    var input = document.createElement('input')
    var value = 'a';

    input.setAttribute('type', 'date');
    input.setAttribute('value', value);

    var isDatePickerSupported = input.value !== value;

    if (isDatePickerSupported) {
        document.documentElement.className += 'ip-form-date-is-supported';
    }

})();
