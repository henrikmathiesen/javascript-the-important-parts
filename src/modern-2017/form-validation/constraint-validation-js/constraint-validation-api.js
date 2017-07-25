(function () {

    'use strict';

    document.addEventListener('submit', function (event) {
        event.preventDefault();

        //
        // lets do some validation tests

        var $name = document.getElementsByClassName('ip-js-form-control-name')[0];
        console.log('$name.willValidate', $name.willValidate);                      // check if browser supports the validation api
        console.log('$name.valid', $name.validity.valid);
        console.log('$name.valueMissing', $name.validity.valueMissing);

        var $foo = document.getElementsByClassName('ip-js-form-control-length')[0];
        console.log('$foo.valid', $foo.validity.valid);
        console.log('$foo.tooShort', $foo.validity.tooShort);                       // still the same problems in IE11 and FF43 (undefined)
        console.log('$foo.tooLong', $foo.validity.tooLong);

        var $range = document.getElementsByClassName('ip-js-form-control-range')[0];
        console.log('$range.valid', $range.validity.valid);
        console.log('$range.rangeOverflow', $range.validity.rangeOverflow);
        console.log('$range.rangeUnderflow', $range.validity.rangeUnderflow);

        var $email = document.getElementsByClassName('ip-js-form-control-email')[0];
        console.log('$email.valid', $email.validity.valid);
        console.log('$email.typeMismatch', $email.validity.typeMismatch);

    }, false);

})();
