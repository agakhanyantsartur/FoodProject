"use strict";
//1ая задача закрывать табы
//2ая открывать нужные табы
//3яя назначить обработчик событий на меню который будет манипулировать свойствами
window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    //Делаем делегирование событий на родителя, чтобы легче было управлять потомком, так как он может меняться динамически
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); //В ковычках не ставим точку, т.к и так работаем с классом
        });
    }

    function showTabContent(i = 0) { //Если функция вызвается без аргументы, то подстваляется 0
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2015-04-15';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());//Получит количество миллисекунд до конченого времени
        const days = Math.floor(t / (1000 * 60 * 60 * 24));//Math.floor округляет аргумент до ближайшего меньшего целого
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t, 
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //Timer displayed on web page

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock(); //Чтобы не было мигание таймера

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            function zeroing(timeValue, timeSelector) { //Чтобы таймер не уходил в отрицательное значение
                if (timeValue <= 0) {
                  timeSelector.innerHTML = '00';  
                } else {
                  timeSelector.innerHTML = getZero(timeValue);
                }
              }

            zeroing(t.days, days);
            zeroing(t.hours, hours);
            zeroing(t.minutes, minutes);
            zeroing(t.seconds, seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');
    
    //Так как нам нужно повесить событие на несколько кнопок, мы прописали querySelectorAll и теперь должны перебрать их через forEach
    modalTrigger.forEach (btn => {
        btn.addEventListener('click', () =>{
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden'; // Делаем так, чтобы когда открыто модальное окно, нельзя было скролить
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    //Делаем так, чтобы когда пользователь кликал на подложку во время откытого модального окна, окно закрывалось
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });
    //Делаем так, чтобы когда пользователь нажимал клавишу Esc, модальное окно закрывалось
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { //Делам так, чтобы при нажатии на Esc, даже когда модальное окно было закрыто, функция закрытия модального окна срабатывала
            closeModal();
        }
    });

});
