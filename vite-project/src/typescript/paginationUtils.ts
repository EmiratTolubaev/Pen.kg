export const getPaginationRange = (current: number, total: number) => {
  const delta = 1; // Количество страниц ПЕРЕД и ПОСЛЕ текущей (центральный блок)
  const range = []; // Сюда соберем все "сырые" номера страниц
  const rangeWithDots = []; // Итоговый массив с многоточием
  let l; // Вспомогательная переменная для отслеживания предыдущего числа

  for (let i = 1; i <= total; i++) {
    // Условие: всегда добавляем 1-ю и последнюю страницы,
    // а также те, что входят в диапазон "текущая +/- delta"
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      // Если разрыв между числами равен 2, вставляем пропущенное число (например, 1, 2, 3)
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      }
      // Если разрыв больше 2, вставляем многоточие
      else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
};
