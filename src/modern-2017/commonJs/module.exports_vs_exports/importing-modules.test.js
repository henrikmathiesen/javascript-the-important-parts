const moduleA = require('./exporting-module-a.js');
const moduleB = require('./exporting-module-b.js');
const moduleC = require('./exporting-module-c.js');

describe('commonJs module.exports vs exports - importing modules', () => {
    it('should find and execute the method a from module a', () => {
        expect(moduleA.a()).toEqual('a');
    });

    it('should find and execute the method b from module a', () => {
        expect(moduleA.b()).toEqual('b');
    });

    it('should not find the method a from module b, since it is no longer exported', () => {
        expect(moduleB.b).not.toBeDefined();
    });

    it('should find the simple string exported from module b', () => {
        expect(moduleB).toEqual('a');
    });

    it('should not find the method from moduleC, but instead an empty object', () => { 
        expect(moduleC).toEqual({});
    });
});

/*
    Summary
    
    By adding properties to exports you are effectively ensuring that you are returning a "typical" module export object.
    In contrast, by using module.exports you can return any value you want (primitive, array, function) and not just an object
    (which is the format most people expect). So module.exports offers more power but can also be used to have your module export
    atypical values (like a primitive). In contrast exports is more limiting but safer (so long as you simply add properties to it and don't reassign it).
*/
