(function () {

    var forms = document.getElementsByClassName('ip-js-validate');

    for (var i = 0; i < forms.length; i++) {
        forms[i].setAttribute('novalidate', true);
    }

})();
