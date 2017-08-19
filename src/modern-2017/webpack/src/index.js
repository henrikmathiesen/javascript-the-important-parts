import $ from 'jquery';

// How much will import 2) this makes app.bundle.js 17270 rows
// import _ from 'lodash';

// How much will import 3) this makes app.bundle.js 17270 rows, which means that everything in lodash is included in bundle (even though we only import curry here)
// import { curry } from 'lodash';

// How much will import 4) this makes app.bundle.js 1391 rows, which means only curry is included
// import curry from 'lodash.curry';

// How much will import 5) lets try a prod build
// - We import _ from 'lodash' and run a prod build
// - We import { curry } from 'lodash' and run a prod build
// - The file sizes are the same, which means everything from lodash is included even though we only import curry
// - We import curry from 'lodash.curry', then the app.bundle.js file size shrinks dramaticly, which means only curry was included
//  * That aproach requires that lodash.curry is installed seperatly
//  * Can however write import curry from 'lodash/curry', that does not require curry to be installed seperatly
//  * See "If it helps anyone else, we found a Babel plugin that provides a useful workaround in the meantime" in https://github.com/webpack/webpack/issues/2867
//
// The concept of tree shaking was ment to resolve this issue https://webpack.js.org/guides/tree-shaking/

import './index.scss';
import something from './components';

// How much will import 1) we import only foo, but both foo and bar are defined in the bundle
import { foo } from './how-much-will-import';

const element = '<div class="js-test">test</div>';
$('body').append(element);

$('.js-test').css('color', 'navy');

// console.log(window.element); element is not in global scope, which is good

// ES6 features (this do work in Chrome59 and FF43, but not IE11 -- we fix that with Babel)

const myArray = ['adam', 'bertil'];
const [adam] = myArray;
console.log(adam);

// import

something();
