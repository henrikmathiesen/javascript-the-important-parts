import $ from 'jquery';
import './style.scss';

var element = '<div class="js-test">test</div>'
$('body').append(element);

$('.js-test').css('color', 'pink');

// console.log(window.element); element is not in global scope, which is good
