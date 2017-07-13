/*
    Pretend this is at the start of this file
    var module = new Module();
    var exports = module.exports;

    both exports and module.exports now point to {}
*/

// we are adding a property a to the module.exports, this is shorter than writing module.exports.a = function(){}
// All exports does is collect properties and attach them to module.exports
exports.a = function () {
    return 'a';
}

// Using both syntaxes in the same file will work, as long as we are setting properties on the object
module.exports.b = function () { 
    return 'b';
};


/*
    Pretend this is at the end of this file
    return module.exports
*/
