function timer() {
  const deadline = '2023-08-15';

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

      updateClock(); //Чтобы не было мигания таймера

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
}
export default timer;