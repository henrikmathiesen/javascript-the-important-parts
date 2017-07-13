/*
    Pretend this is at the start of this file
    var module = new Module();
    var exports = module.exports;

    both exports and module.exports now point to {}
*/

// This wont work since it is not exports that is exported from file, it is module.exports (and it still points to an empty object)
exports = function(){
    return 'this wont work';
}

/*
    Pretend this is at the end of this file
    return module.exports
*/
