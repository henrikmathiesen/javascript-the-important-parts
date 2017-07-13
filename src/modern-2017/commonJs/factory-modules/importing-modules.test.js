const worker = require('./worker.js');
const workerFactory = require('./worker-factory.js');

describe('commonJs factory modules - importing modules', () => {
    it('is the same object but the counter is outside the function, so it is keeping its state', () => {
        expect(typeof worker === 'object').toEqual(true);
        expect(worker.job()).toEqual('working 1 times');
        expect(worker.job()).toEqual('working 2 times');
    });

    it('is not the same object, a new object is returned from a factory function', () => {
        expect(typeof workerFactory === 'function').toEqual(true);
        const wf01 = workerFactory('foo');
        const wf02 = workerFactory('bar');

        expect(typeof wf01 === 'object').toEqual(true);
        expect(typeof wf02 === 'object').toEqual(true);
        expect(wf01).not.toBe(wf02);

        expect(wf01.job()).toEqual('working 1 times');
        expect(wf01.job()).toEqual('working 2 times');
        expect(wf02.job()).toEqual('working 1 times');

        expect(wf01.name).toEqual('foo');
        expect(wf02.name).toEqual('bar');
    });
});
