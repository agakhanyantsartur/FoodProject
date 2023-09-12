import tabs from './modules/tabs';
import modal from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import carts from './modules/carts';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    modal('[data-modal]', '.modal');
    forms();
    slider();
    timer();
    carts();
    calculator();
});
