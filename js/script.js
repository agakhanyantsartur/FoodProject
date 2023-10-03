import tabs from './modules/tabs';
import modal from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import carts from './modules/carts';
import calculator from './modules/calculator';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
    tabs();
    modal('[data-modal]', '.modal', modalTimerId);
    forms();
    slider();
    timer();
    carts();
    calculator();
});
