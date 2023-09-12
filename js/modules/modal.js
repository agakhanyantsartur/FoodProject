function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
}

function modal(triggerSelector, modalSelector) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  //Так как нам нужно повесить событие на несколько кнопок, мы прописали querySelectorAll и теперь должны перебрать их через forEach
  modalTrigger.forEach (btn => {
    btn.addEventListener('click', () => openModal(modalSelector)); //для openModal используем прием, когда ее нужно обернуть в функцию так как если мы передаем в обработчик события колбэк функцию, то мы не должны ее сразу вызывать, а должны просто объявить
      // Делаем так, чтобы когда открыто модальное окно, нельзя было скролить
  });

  //Делаем так, чтобы когда пользователь кликал на подложку во время откытого модального окна, окно закрывалось
  modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  //Делаем так, чтобы когда пользователь нажимал клавишу Esc, модальное окно закрывалось
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) { //Делам так, чтобы при нажатии на Esc, даже когда модальное окно было закрыто, функция закрытия модального окна срабатывала
      closeModal(modalSelector);
    }
  });

  //Также делаем так, чтобы модальное окно всплывало через 10-15 сек на сайте
  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal(modalSelector);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  //Показываем пользователю модальное окно, если он долистал до конца
  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};