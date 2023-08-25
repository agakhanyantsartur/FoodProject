window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const modal = require('./modules/modal');
    const forms = require('./modules/forms');
    const slider = require('./modules/slider');
    const timer = require('./modules/timer');
    const carts = require('./modules/carts');
    const calculator = require('./modules/calculator');

    tabs();
    modal();
    forms();
    slider();
    timer();
    carts();
    calculator();
});
