import $ from 'jquery';
import './index.scss';
import something from './components';

// we import only foo, but both foo and bar are defined in the bundle
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
