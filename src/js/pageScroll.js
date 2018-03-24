export default pageScroll;

/**
 * @description Функция для инициализации скролла страницы
 */
function pageScroll() {
  //точка начала нажатия
  let touchStart = 0;

  let container = document.querySelector('.main');
  let scrollDownArrow = document.querySelector('.scroll-down');

  //устанавливает начальное значение трансформации
  container.style.transform = 'translateY(0%)';

  //обработчик события на начало нажатия
  document.addEventListener('touchstart', (e) => {
    touchStart = e.targetTouches[0].clientY;
  });

  //обработчик события на конец нажатия
  document.addEventListener('touchend', (e) => {
    //точка конца нажатия
    let touchEnd = e.changedTouches[0].clientY;

    //разница между точками начала и конца
    let touchDiff = touchStart - touchEnd;
    let direction;

    //если свайпа не было, то выходим из функции
    if (touchDiff === 0) return;

    //устанавливает направление свайпа
    direction = touchDiff < 0 ? 'up' : 'down';

    scroll(direction);
  });

  //обработчик события при нажатии на кнопку
  scrollDownArrow.addEventListener('click', () => {
    scroll('down');
  });
}

/**
 * Функция для скролла страницы
 * @param direction {string} Направление скролла
 */
function scroll(direction) {
  let activePaginationNumber;
  let transform;

  let container = document.querySelector('.main');
  let sectionsLength = document.getElementsByClassName('slide-section').length - 1;

  //текущее состояние трансформации
  let currentOffset = parseInt(container.style.transform.match(/-?\d+/)[0]);
  let transformOffset = currentOffset;

  //следующее состояние трансформации
  if (direction === 'up' && currentOffset !== 0)
    transformOffset = currentOffset + 100;
  else if (direction === 'down' && currentOffset !== sectionsLength * -100)
    transformOffset = currentOffset - 100;

  //устаналивает новое состояние трансформации
  transform = `translateY(${transformOffset}%)`;
  container.style.transform = transform;

  //следующий номер активной пагинации
  activePaginationNumber = Math.abs(transformOffset / 100);
  setPagination(activePaginationNumber);
}

/**
 * @description Меняет активную пагинацию
 * @param activeNumber {number} Номер устанавливаемой пагинации
 */
function setPagination(activeNumber) {
  let paginationList = document.getElementsByClassName('pagination__item');

  for (let i = 0; i < paginationList.length; i++) {
    if (i === activeNumber) {
      //делает пагинацию активной
      paginationList[i].classList.add('active');
      continue;
    }

    //остальные делает неактивными
    paginationList[i].classList.remove('active');
  }
}