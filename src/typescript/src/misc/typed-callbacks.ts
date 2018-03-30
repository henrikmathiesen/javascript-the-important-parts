// This is one way of typing a callback function

function getData01(doneCb: (s: string) => void) {
    // fetching data...
    const data = 'foo';
    doneCb(data);
}

function doneCb01(data: string) {
    console.log(data);
}

getData01(doneCb01);

// By the way
interface IFoo {
    func(): void;
    doneCb: (s: string) => void;    // A1) Maybe we should use this style for interfaces then also
}

//
// This is another way of typing a callback function

type Callback = (s: string) => void;

function getData02(doneCb: Callback) {
    // fetching data...
    const data = 'bar';
    doneCb(data);
}

function doneCb02(data: string) {
    console.log(data);
}

getData02(doneCb02);

//
// This is yet another way of typing a callback function

interface ICallbackFn {
    (s: string): void;              // A2) But it dont match this
}

function getData03(doneCb: ICallbackFn) {
    // fetching data
    const data = 'xyz';
    doneCb(data);
}

function doneCb03(data: string) { 
    console.log(data);
}

getData03(doneCb03);


