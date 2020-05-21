(function () {

    //
    // jQuery Way

    $('#jq-target').append('<p>Iam text</p>');

    //
    // Vanilla Way
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

    const p = document.createElement('p');
    const t = document.createTextNode('Iam text');
    p.appendChild(t);

    document.getElementById('js-target').appendChild(p);

})();
